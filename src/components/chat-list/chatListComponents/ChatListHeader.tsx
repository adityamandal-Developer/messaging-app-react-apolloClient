import AddCircle from "@mui/icons-material/AddCircle";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";

interface CHAT_LIST_PROPS {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: CHAT_LIST_PROPS) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
