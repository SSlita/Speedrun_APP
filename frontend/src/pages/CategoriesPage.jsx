import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import {
  PageContainer,
  ContentWrapper,
  SectionHeader,
  SectionTitle,
  StatusMessage,
  CategoriesGrid,
} from "../styles/CategoriesPage.styles";

const CategoriesPage = () => {
  const { gameId } = useParams();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories", gameId],
    queryFn: async () => {
      const res = await api.get(`/categories/game/${gameId}`);
      return res.data;
    },
    enabled: !!gameId,
  });

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          {isLoading && (
            <StatusMessage>
              <p>Chargement des catégories...</p>
            </StatusMessage>
          )}
          {!isLoading && (
            <>
              <SectionHeader>
                <SectionTitle>
                  Catégories
                  {categories.length > 0 && <span>{categories.length}</span>}
                </SectionTitle>
              </SectionHeader>
              {categories.length === 0 ? (
                <StatusMessage>
                  <p>Aucune catégorie</p>
                  <small>Ajoutez votre première catégorie avec le bouton en haut à droite</small>
                </StatusMessage>
              ) : (
                <CategoriesGrid>
                  {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                  ))}
                </CategoriesGrid>
              )}
            </>
          )}
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default CategoriesPage;
