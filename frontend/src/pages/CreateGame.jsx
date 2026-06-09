import GameCreation from '../components/GameCreation';
import Navbar from '../components/Navbar';
import { PageContainer, ContentWrapper } from '../styles/CreateGame.styles';

const CreateGame = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <GameCreation />
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default CreateGame;