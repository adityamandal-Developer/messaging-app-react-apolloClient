import List from "@mui/material/List";
import ChatListItem from "./chatListComponents/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chatListComponents/ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./chatListComponents/ChatListAdd";
import { useQuery } from "@apollo/client";
import { ChatsDocument } from "../../config/gql/generated";

export default function ChatList() {
  const [chatListVisible, setChatListVisible] = useState<boolean>(false);
  const { data, loading, error } = useQuery(ChatsDocument);
  console.log(data?.chats);
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
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats.map((chat, idx) => (
            <ChatListItem key={idx} chat={chat} />
          ))}
        </List>
      </Stack>
    </>
  );
}
