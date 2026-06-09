import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import CategoryCreation from "../components/CategoryCreation";
import { PageContainer, ContentWrapper } from "../styles/CreateCategory.styles";

const CreateCategory = () => {
  const { gameId } = useParams();

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <CategoryCreation gameId={gameId} />
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default CreateCategory;