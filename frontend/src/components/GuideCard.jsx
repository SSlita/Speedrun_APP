import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Card,
  Step,
  StepTitle,
  StepContent,
  Image,
  Video,
  Actions,
  IconButton
} from "../styles/GuideCard.styles";


const GuideCard = ({ guide, setGuides }) => {
  const navigate = useNavigate();

  const handleDelete = async (_, id) => {
    if (!window.confirm("Voulez-vous supprimer ce guide ?")) return;
    try {
      await api.delete(`/guides/${id}`);
      setGuides((prev) => prev.filter((g) => g._id !== id));
      toast.success("Guide supprimé avec succès");
    } catch (error) {
      console.log("Erreur", error);
      toast.error("Échec lors de la suppression");
    }
  };

  console.log(guide.sections)
  guide.sections.forEach(section => {
    console.log("Section:", section.title);
    section.steps.forEach(step => {
      console.log(`  Étape ${step.order}: ${step.content}`);
    });
  });

  return (
    <Card>
      {(guide.sections ?? []).map((section) => (
        <Accordion key={section._id}>
          <AccordionSummary
            id={`${section._id}`}
            expandIcon={<ExpandMoreIcon />}
          >
            <StepTitle>{section.title}</StepTitle>
          </AccordionSummary>
          <AccordionDetails>
            {(section.steps ?? []).map((step) => (
              <Step
                key={step._id}
                id={`${section._id}-${step.order}`}
              >
                <StepContent>{step.content}</StepContent>
                {step.mediaType === "image" && step.mediaUrl && (
                  <Image
                    src={step.mediaUrl}
                    loading="lazy"
                    alt={step.mediaUrl}
                  />
                )}
                {step.mediaType === "video" && step.mediaUrl && (
                  <Video
                    src={step.mediaUrl}
                    autoPlay
                    muted
                    loop
                  />
                )}

              </Step>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Actions>
        <IconButton onClick={() => navigate(`/detailGuide/${guide._id}`)}>
          <PenSquareIcon size={18} />
        </IconButton>
        <IconButton onClick={(e) => handleDelete(e, guide._id)}>
          <Trash2Icon size={18} />
        </IconButton>
      </Actions>
    </Card>
  );
};

export default GuideCard;