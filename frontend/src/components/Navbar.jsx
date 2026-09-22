import { useLocation, useParams } from "react-router";
import {
  Header,
  NavContainer,
  Logo,
  AppTitle,
  SearchContainer,
  SearchInput,
  NavActions,
} from "../styles/Navbar.styles";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <Header>
      <NavContainer>
        <Logo to="/" aria-label="Accueil SpeedRun" />
        <AppTitle>Speed<span>run</span></AppTitle>
        {isHome && (
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Rechercher un jeu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        )}
        <NavActions />
      </NavContainer>
    </Header>
  );
};

export default Navbar;
