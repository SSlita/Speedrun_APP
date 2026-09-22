import {
  Card,
  CardInner,
  CardLink,
  CoverWrapper,
  CoverImage,
  CoverPlaceholder,
  PlatformBadge,
  CardFooter,
  Title,
} from "../styles/GameCard.styles";

const GameCard = ({ game }) => {
  return (
    <Card>
      <CardInner>
        <CardLink to={`/game/${game._id}`}>
          <CoverWrapper>
            {game.coverImage ? (
              <CoverImage src={game.coverImage} alt={game.title} />
            ) : (
              <CoverPlaceholder>🎮</CoverPlaceholder>
            )}
            {game.platform && (
              <PlatformBadge>{game.platform}</PlatformBadge>
            )}
          </CoverWrapper>
        </CardLink>
        <CardFooter>
          <Title title={game.title}>{game.title}</Title>
        </CardFooter>
      </CardInner>
    </Card>
  );
};

export default GameCard;
