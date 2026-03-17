import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import {
  Card,
  CardLink,
  Title,
  Actions,
  IconButton
} from "../styles/CategoryCard.styles";

const CategoryCard = ({ category, setCategories }) => {
  const navigate = useNavigate();

  const handleDelete = async (_, id) => {
    if (!window.confirm("Voulez-vous supprimer cette catégorie ?")) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) =>
        prev.filter((c) => c._id !== id)
      );
      toast.success("Catégorie supprimée avec succès");
    } catch (error) {
      toast.error("Échec lors de la suppression");
    }
  };

  return (
    <Card>
      <CardLink to={`/category/${category._id}`}>
        <Title>{category.name}</Title>
      </CardLink>

      <Actions>
        <IconButton
          onClick={() => navigate(`/detailCategory/${category._id}`)}
        >
          <PenSquareIcon size={18} />
        </IconButton>

        <IconButton
          onClick={(e) => handleDelete(e, category._id)}
        >
          <Trash2Icon size={18} />
        </IconButton>
      </Actions>
    </Card>
  );
};

export default CategoryCard;
