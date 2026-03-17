import { PlusIcon } from "lucide-react";
import { Header, NavContainer, Logo, CreateLink } from "../styles/Navbar.styles";

const Navbar = () => {
  return (
    <Header>
      <NavContainer>
        <Logo>LOGO</Logo>

        <CreateLink to="/createGame">
          <PlusIcon size={18} />
          <span>Nouveau Jeu</span>
        </CreateLink>
      </NavContainer>
    </Header>
  );
};

export default Navbar;
