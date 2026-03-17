import { Link } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import GameCreation from '../components/GameCreation';

const CreateGame = () => {
  return (
    <div>
      <Link to="/">
        <ArrowLeftIcon />
        Retour à l'accueil
      </Link>
      <GameCreation />
    </div>
  );
};

export default CreateGame;