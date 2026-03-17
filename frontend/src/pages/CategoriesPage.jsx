import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../lib/axios";
import CategoryCard from "../components/CategoryCard";
import {
  PageContainer,
  BackLink,
  Header,
  HeaderContent,
  Logo,
  CreateLink,
  StatusMessage,
  CategoriesGrid
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
    <PageContainer>
      <BackLink to="/">
        <ArrowLeftIcon size={18} />
        Retour à l'accueil
      </BackLink>

      <Header>
        <HeaderContent>
          <Logo>LOGO</Logo>

          <CreateLink to={`/game/${gameId}/createCategory`}>
            <PlusIcon size={18} />
            Nouvelle catégorie
          </CreateLink>
        </HeaderContent>
      </Header>

      {loading && (
        <StatusMessage>Chargement des catégories...</StatusMessage>
      )}

      {!loading && categories.length === 0 && (
        <StatusMessage>Aucune catégorie pour le moment</StatusMessage>
      )}

      {categories.length > 0 && (
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
    </PageContainer>
  );
};

export default CategoriesPage;
