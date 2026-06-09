import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/axios";
import GuideCard from "../components/GuideCard";
import Navbar from "../components/Navbar";
import TableOfContent from "../components/TableOfContent";
import {
  PageContainer,
  ContentWrapper,
  SectionHeader,
  SectionTitle,
  StatusMessage,
  GuidesGrid,
  ContentLayout,
} from "../styles/GuidePage.styles";

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
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          {loading && (
            <StatusMessage><p>Chargement des guides...</p></StatusMessage>
          )}

          {!loading && (
            <>
              <SectionHeader>
                <SectionTitle>
                  Sections
                  {guides.length > 0 && <span>{guides.length}</span>}
                </SectionTitle>
              </SectionHeader>

              {guides.length === 0 ? (
                <StatusMessage>
                  <p>Aucun guide</p>
                  <small>Ajoutez votre premier guide avec le bouton en haut à droite</small>
                </StatusMessage>
              ) : (
                <ContentLayout>
                  <TableOfContent guides={guides} />
                  <GuidesGrid>
                    {guides.map((guide) => (
                      <GuideCard key={guide._id} guide={guide} setGuides={setGuides} />
                    ))}
                  </GuidesGrid>
                </ContentLayout>
              )}
            </>
          )}
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default GuidePage;