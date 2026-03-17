import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import {
  Card,
  CardInner,
  CardLink,
  CoverImage,
  CardContent,
  TitleRow,
  Title,
  Actions,
  IconButton
} from "../styles/GameCard.styles";

const GameCard = ({ game, setGames }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Voulez-vous vraiment supprimer le jeu ?")) {
      return;
    }
    try {
      await api.delete(`/jeux/${id}`);
      setGames((prev) => prev.filter((g) => g._id !== id));
      toast.success("Jeu supprimé avec succès");
    } catch (error) {
      toast.error("Échec lors de la suppression");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/detailGame/${game._id}`);
  };

  return (
    <Card>
      <CardInner>
        <CardLink to={`/game/${game._id}`}>
          <CoverImage
            src={game.coverImage}
            alt={game.title}
          />
          <CardContent>
            <TitleRow>
              <Title>{game.title}</Title>
              {game.platform && (
                <PlatformBadge>{game.platform}</PlatformBadge>
              )}
            </TitleRow>
          </CardContent>
        </CardLink>

        <Actions>
          <IconButton onClick={handleEdit} title="Modifier">
            <PenSquareIcon size={16} />
          </IconButton>
          <IconButton onClick={(e) => handleDelete(e, game._id)} title="Supprimer">
            <Trash2Icon size={16} />
          </IconButton>
        </Actions>
      </CardInner>
    </Card>
  );
};

export default GameCard;