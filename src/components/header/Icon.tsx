import { Typography } from "@mui/material";
import VoicemailSharpIcon from "@mui/icons-material/VoicemailSharp";
import router from "../Routes";
const Icon = () => {
  return (
    <>
      <VoicemailSharpIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        Talks
      </Typography>
    </>
  );
};

export default Icon;
