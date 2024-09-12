import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Icon from "./Icon";
import MobileNav from "./mobile/MobileNav";
import MobileIcon from "./mobile/MobileIcon";
import NavLinks from "./NavLinks";
import UserSettings from "./UserSettings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../config/authenticated";

const pages: string[] = ["Home"];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon />
          <MobileNav pages={pages} />
          <MobileIcon />
          <NavLinks pages={pages} />
          {authenticated && <UserSettings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
