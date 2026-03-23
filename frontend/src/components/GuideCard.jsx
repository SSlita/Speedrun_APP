import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
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

  return (
    <Card>
      {guide.steps.map((step) => (
        <Step
          key={step.order}
          id={`${guide._id}-${step.title.replace(/\s+/g, "-")}`}
        >
          <StepTitle>{step.title}</StepTitle>
          <StepContent>{step.content}</StepContent>

          {step.mediaType === "image" && (
            <Image
              src={`${step.mediaUrl}`}
              loading="lazy"
              alt={step.mediaUrl}
            />
          )}

          {step.mediaType === "video" && (
            <Video
              src={`${step.mediaUrl}`}
              autoPlay
              muted
              loop
            />
          )}
        </Step>
      ))}

      <Actions>
        <IconButton
          onClick={() => navigate(`/detailGuide/${guide._id}`)}
        >
          <PenSquareIcon size={18} />
        </IconButton>

        <IconButton
          onClick={(e) => handleDelete(e, guide._id)}
        >
          <Trash2Icon size={18} />
        </IconButton>
      </Actions>
    </Card>
  );
};

export default GuideCard;
