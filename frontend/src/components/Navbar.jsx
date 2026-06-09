import { PlusIcon, ArrowLeftIcon } from "lucide-react";
import { useLocation, useParams } from "react-router";
import {
  Header,
  NavContainer,
  Logo,
  AppTitle,
  SearchContainer,
  SearchInput,
  NavActions,
  CreateLink,
  BackLink,
} from "../styles/Navbar.styles";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { gameId, categoryId } = useParams();

  const isHome = location.pathname === "/";
  const isCategory = !!gameId && location.pathname.startsWith(`/game/${gameId}`);
  const isGuide = !!categoryId && location.pathname.startsWith(`/category/${categoryId}`);
  
  return (
    <Header>
      <NavContainer>
        <Logo to="/" />
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

        <NavActions>
          {isHome && (
            <CreateLink to="/createGame">
              <PlusIcon size={16} />
              Nouveau jeu
            </CreateLink>
          )}

          {isCategory && (
            <CreateLink to={`/game/${gameId}/createCategory`}>
              <PlusIcon size={16} />
              Nouvelle catégorie
            </CreateLink>
          )}

          {isGuide && (
            <CreateLink to={`/category/${categoryId}/createGuide`}>
              <PlusIcon size={16} />
              Nouveau Guide
            </CreateLink>
          )}
        </NavActions>
      </NavContainer>
    </Header>
  );
};

export default Navbar;
