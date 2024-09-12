import { Typography } from "@mui/material";
import VoicemailSharpIcon from "@mui/icons-material/VoicemailSharp";
import router from "../../Routes";

const MobileIcon = () => {
  return (
    <>
      <VoicemailSharpIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
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

export default MobileIcon;
