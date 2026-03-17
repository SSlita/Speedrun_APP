import { useEffect, useState } from "react";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import {
  PageContainer,
  StatusMessage,
  GamesGrid
} from "../styles/HomePage.styles";

import { SearchContainer, SearchInput } from "../styles/Searchbar.styles";

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
        console.log("Impossible de récupérer les jeux", error);
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
      <Navbar />
      <PageContainer>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Recherché un jeu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        {loading && (
          <StatusMessage>Chargement des jeux...</StatusMessage>
        )}
        {!loading && filteredGames.length === 0 && (
          <StatusMessage>
            {searchQuery ? "Aucun jeu trouvé" : "Aucun jeu pour le moment"}
          </StatusMessage>
        )}
        {filteredGames.length > 0 && (
          <GamesGrid>
            {filteredGames.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                setGames={setGames}
              />
            ))}
          </GamesGrid>
        )}
      </PageContainer>
    </>
  );
};

export default HomePage;