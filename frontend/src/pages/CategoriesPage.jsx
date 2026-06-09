import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`/categories/game/${gameId}`);
        setCategories(res.data);
      } catch (error) {
        console.log("Impossible de récupérer les catégories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [gameId]);

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          {loading && (
            <StatusMessage>
              <p>Chargement des catégories...</p>
            </StatusMessage>
          )}

          {!loading && (
            <>
              <SectionHeader>
                <SectionTitle>
                  Catégories
                  {categories.length > 0 && (
                    <span>{categories.length}</span>
                  )}
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
                    <CategoryCard
                      key={category._id}
                      category={category}
                      setCategories={setCategories}
                    />
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