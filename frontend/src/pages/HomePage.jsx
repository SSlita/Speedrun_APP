import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [searchQuery, setSearchQuery] = useState("");

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["jeux"],
    queryFn: async () => {
      const res = await api.get("/jeux");
      return res.data;
    },
  });

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PageContainer>
        <ContentWrapper>
          {isLoading && (
            <LoadingGrid>
              <SkeletonCards />
            </LoadingGrid>
          )}
          {!isLoading && (
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
                    <GameCard key={game._id} game={game} />
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
