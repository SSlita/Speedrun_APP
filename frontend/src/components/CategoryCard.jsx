import {
  Card,
  CardLink,
  CategoryLabel,
  Title,
} from "../styles/CategoryCard.styles";

const CategoryCard = ({ category }) => {
  return (
    <Card>
      <CardLink to={`/category/${category._id}`}>
        <CategoryLabel>Catégorie</CategoryLabel>
        <Title>{category.name}</Title>
      </CardLink>
    </Card>
  );
};

export default CategoryCard;

