import React, { useEffect, useRef, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import {
  ChatDocument,
  Message,
  MessageCreatedDocument,
  MessagesDocument,
} from "../../config/gql/generated";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetMe } from "../../hooks/useGetMe";
import OtherPersonMessage from "./OtherPersonMessage";
import MyMessage from "./MyMessage";

const Chat = () => {
  const { _id } = useParams<{ _id: string }>();
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState<Message[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  const { data, loading, error } = useQuery(ChatDocument, {});
  const { data: messageData } = useQuery(MessagesDocument, {
    variables: { chatId: _id! },
  });
  const { data: latestMessage } = useSubscription(MessageCreatedDocument, {
    variables: { chatId: _id! },
  });

  useEffect(() => {
    scrollToBottom();
  }, [location, message, currentMessage]);

  useEffect(() => {
    if (messageData) {
      setCurrentMessage(messageData.messages);
    }
  }, [messageData]);

  useEffect(() => {
    if (
      latestMessage?.messageCreated &&
      (!messageData?.messages || // Handles case when there are no previous messages
        messageData?.messages?.length === 0 || // New chat room, no messages yet
        latestMessage.messageCreated._id !==
          messageData?.messages?.[messageData.messages.length - 1]?._id) // Ensures not to append duplicate messages
    ) {
      setCurrentMessage((prev) => [...prev, latestMessage.messageCreated]);
    }
  }, [latestMessage, messageData]);
  const { data: user } = useGetMe();

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageinput: { content: message, chatId: _id! },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  const createMessage = useCreateMessage(_id!);
  console.log(messageData);
  console.log(currentMessage);
  console.log(latestMessage);
  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
        width: "100%",
        p: "10px",
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {currentMessage.length > 0 &&
          [...(currentMessage || [])]
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((message) => (
              <React.Fragment key={message._id}>
                {message.user._id !== user?.me._id ? (
                  <OtherPersonMessage message={message} />
                ) : (
                  <MyMessage message={message} />
                )}
              </React.Fragment>
            ))}

        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "8px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
