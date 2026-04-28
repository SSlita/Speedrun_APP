import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/axios";
import GuideCard from "../components/GuideCard";
import {
  PageContainer,
  BackLink,
  Header,
  HeaderContent,
  Logo,
  CreateLink,
  StatusMessage,
  GuidesGrid
} from "../styles/GuidePage.styles";
import { ContentLayout } from "../styles/GuidePage.styles";

import TableOfContent from "../components/TableOfContent";

const GuidePage = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchGuides = async () => {
      try {
        const res = await api.get(`/guides/category/${categoryId}`);
        setGuides(res.data);
      } catch (error) {
        console.log("Impossible de récupérer les guides", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [categoryId]);

  return (
    <PageContainer>
      <BackLink to="/">
        <ArrowLeftIcon size={18} />
        Retour à l'accueil
      </BackLink>

      <Header>
        <HeaderContent>
          <Logo>LOGO</Logo>

          <CreateLink to={`/category/${categoryId}/createGuide`}>
            <PlusIcon size={18} />
            Nouveau guide
          </CreateLink>
        </HeaderContent>
      </Header>

      {loading && (
        <StatusMessage>Chargement des guides...</StatusMessage>
      )}

      {!loading && guides.length === 0 && (
        <StatusMessage>Aucun guide pour le moment</StatusMessage>
      )}

      {guides.length > 0 && (
        <ContentLayout>
          <TableOfContent guides={guides} />
          <GuidesGrid>
            {guides.map((guide) => (
              <GuideCard
                key={guide._id}
                guide={guide}
                setGuides={setGuides}
              />
            ))}
          </GuidesGrid>
        </ContentLayout>
      )}
    </PageContainer>

  );
};

export default GuidePage;
