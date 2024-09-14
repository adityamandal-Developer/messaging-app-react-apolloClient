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
import { Page } from "../../interfaces/page.interfaces";

const pages: Page[] = [
  {
    title: "Home",
    path: "/home",
  },
];

const unAuthPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "SignUp",
    path: "/signup",
  },
];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon />
          <MobileNav pages={authenticated ? pages : unAuthPages} />
          <MobileIcon />
          <NavLinks pages={authenticated ? pages : unAuthPages} />
          {authenticated && <UserSettings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
