import { Box, Button } from "@mui/material";
import router from "../Routes";
import { Page } from "../../interfaces/page.interfaces";

interface IProps {
  pages: Page[];
}
const NavLinks = ({ pages }: IProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          onClick={() => router.navigate(page.path)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
