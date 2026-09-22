import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
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

  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["guides", categoryId],
    queryFn: async () => {
      const res = await api.get(`/guides/category/${categoryId}`);
      return res.data;
    },
    enabled: !!categoryId,
  });

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          {isLoading && (
            <StatusMessage><p>Chargement des guides...</p></StatusMessage>
          )}
          {!isLoading && (
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
                      <GuideCard key={guide._id} guide={guide} />
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
