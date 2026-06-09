import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import GuideCreation from "../components/GuideCreation";
import { PageContainer, ContentWrapper } from "../styles/CreateGuide.styles";

const CreateGuide = () => {
  const { categoryId } = useParams();

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <GuideCreation categoryId={categoryId} />
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default CreateGuide;