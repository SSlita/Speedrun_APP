import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import {
  Card,
  CardInner,
  CardLink,
  CoverWrapper,
  CoverImage,
  CoverPlaceholder,
  PlatformBadge,
  CardFooter,
  Title,
  Actions,
  IconButton,
} from "../styles/GameCard.styles";

const GameCard = ({ game, setGames }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Voulez-vous vraiment supprimer ce jeu ?")) return;
    try {
      await api.delete(`/jeux/${game._id}`);
      setGames((prev) => prev.filter((g) => g._id !== game._id));
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
          <CoverWrapper>
            {game.coverImage ? (
              <CoverImage src={game.coverImage} alt={game.title} />
            ) : (
              <CoverPlaceholder>🎮</CoverPlaceholder>
            )}
            {game.platform && (
              <PlatformBadge>{game.platform}</PlatformBadge>
            )}
          </CoverWrapper>
        </CardLink>

        <CardFooter>
          <Title title={game.title}>{game.title}</Title>
          <Actions className="card-actions">
            <IconButton onClick={handleEdit} title="Modifier">
              <PenSquareIcon size={14} />
            </IconButton>
            <IconButton onClick={handleDelete} title="Supprimer">
              <Trash2Icon size={14} />
            </IconButton>
          </Actions>
        </CardFooter>
      </CardInner>
    </Card>
  );
};

export default GameCard;
