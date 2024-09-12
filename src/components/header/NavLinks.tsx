import { Box, Button } from "@mui/material";
import router from "../Routes";

interface IProps {
  pages: string[];
}
const NavLinks = ({ pages }: IProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => router.navigate(page)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
