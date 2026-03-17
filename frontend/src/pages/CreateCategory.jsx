import { useParams, Link } from "react-router";
import { ArrowLeftIcon } from 'lucide-react';
import CategoryCreation from "../components/CategoryCreation";

const CreateCategory = () => {
  const { gameId } = useParams();

  return (
    <div>
      <Link to={`/game/${gameId}`}>
        <ArrowLeftIcon />
        Retour au jeu
      </Link>
      <CategoryCreation
        gameId={gameId} />
    </div>
  )
}

export default CreateCategory;