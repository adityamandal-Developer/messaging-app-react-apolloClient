import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ChatDocument } from "../../config/gql/generated";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const { _id } = useParams<{ _id: string }>();

  const { data, loading, error } = useQuery(ChatDocument, {
    variables: { _id: _id! },
  });
  console.log(data);
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
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
