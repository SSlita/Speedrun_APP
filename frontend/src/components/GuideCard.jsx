import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as S from "../styles/GuideCard.styles";


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
    <>
      {(guide.sections ?? []).map((section) => (
        <S.StyledAccordion key={section._id}>
          <S.StyledSummaryAccordion
            id={`${section._id}`}
            expandIcon={<ExpandMoreIcon />}
          >
            <S.StepTitle>{section.title}</S.StepTitle>
          </S.StyledSummaryAccordion>
          <AccordionDetails>
            {(section.steps ?? []).map((step) => (
              <S.Step
                key={step._id}
                id={`${section._id}-${step.order}`}
              >
                <S.StepContent>{step.content}</S.StepContent>
                {step.mediaType === "image" && step.mediaUrl && (
                  <S.Image
                    src={step.mediaUrl}
                    loading="lazy"
                    alt={step.mediaUrl}
                  />
                )}
                {step.mediaType === "video" && step.mediaUrl && (
                  <S.Video
                    src={step.mediaUrl}
                    autoPlay
                    muted
                    loop
                  />
                )}

              </S.Step>
            ))}
          </AccordionDetails>
          <S.Actions>
            <S.IconButton onClick={() => navigate(`/detailGuide/${guide._id}`)}>
              <PenSquareIcon size={18} />
            </S.IconButton>
            <S.IconButton onClick={(e) => handleDelete(e, guide._id)}>
              <Trash2Icon size={18} />
            </S.IconButton>
          </S.Actions>
        </S.StyledAccordion>
      ))}

    </>
  );
};

export default GuideCard;