import List from "@mui/material/List";
import ChatListItem from "./chatListComponents/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chatListComponents/ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./chatListComponents/ChatListAdd";

export default function ChatList() {
  const [chatListVisible, setChatListVisible] = useState<boolean>(false);
  return (
    <>
      <ChatListAdd
        open={chatListVisible}
        handleClose={() => setChatListVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
        </List>
      </Stack>
    </>
  );
}
