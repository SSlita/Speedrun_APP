import { useEffect, useState } from "react";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import {
  PageContainer,
  ContentWrapper,
  SectionTitle,
  SectionHeader,
  StatusMessage,
  GamesGrid,
  LoadingGrid,
  SkeletonCard,
} from "../styles/HomePage.styles";

const SKELETON_COUNT = 10;

const SkeletonCards = () =>
  Array.from({ length: SKELETON_COUNT }).map((_, i) => (
    <SkeletonCard key={i}>
      <div className="skeleton-cover" />
      <div className="skeleton-footer">
        <div className="skeleton-line w-80" />
      </div>
    </SkeletonCard>
  ));

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Speedrun";
    const fetchGames = async () => {
      try {
        const res = await api.get("/jeux");
        setGames(res.data);
        setFilteredGames(res.data);
      } catch (error) {
        console.error("Impossible de récupérer les jeux", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery, games]);

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <PageContainer>
        <ContentWrapper>
          {loading && (
            <LoadingGrid>
              <SkeletonCards />
            </LoadingGrid>
          )}

          {!loading && (
            <>
              <SectionHeader>
                <SectionTitle>
                  {searchQuery ? `Résultats pour "${searchQuery}"` : "Tous les jeux"}
                  {filteredGames.length > 0 && (
                    <span>{filteredGames.length}</span>
                  )}
                </SectionTitle>
              </SectionHeader>

              {filteredGames.length === 0 ? (
                <StatusMessage>
                  <p>{searchQuery ? "Aucun jeu trouvé" : "Aucun jeu pour le moment"}</p>
                  <small>
                    {searchQuery
                      ? "Essayez un autre terme de recherche"
                      : "Ajoutez votre premier jeu avec le bouton en haut à droite"}
                  </small>
                </StatusMessage>
              ) : (
                <GamesGrid>
                  {filteredGames.map((game) => (
                    <GameCard key={game._id} game={game} setGames={setGames} />
                  ))}
                </GamesGrid>
              )}
            </>
          )}
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default HomePage;
