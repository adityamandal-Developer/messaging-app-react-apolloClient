import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useLogout } from "../../hooks/userLogout";
import { onLogout } from "../../utils/logout";
import { snackVar } from "../../utils/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { SUCCESS_LOGOUT__SNACK_MESSAGE } from "../../constants/success";
import { GraphQLError, GraphQLErrorOptions } from "graphql";

const settings = ["Logout"];
const UserSettings = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { logout } = useLogout();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="logout" onClick={handleCloseUserMenu}>
          <Typography
            sx={{ textAlign: "center" }}
            onClick={async () => {
              try {
                await logout();
                onLogout();
                snackVar(SUCCESS_LOGOUT__SNACK_MESSAGE);
              } catch (error) {
                if ((error as any).message === "Unauthorized") {
                  return;
                } else snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
              }
            }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserSettings;
