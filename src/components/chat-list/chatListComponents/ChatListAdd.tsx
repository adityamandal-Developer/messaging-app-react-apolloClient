import Search from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UNKNOWN_ERROR_MESSSAGE } from "../../../constants/errors";
import { useCreateChat } from "../../../hooks/useCreateChat";
import router from "../../Routes";

interface CHAT_LIST_PROPS {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: CHAT_LIST_PROPS) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState("");
  const { createChat, mutationResult } = useCreateChat();
  const { loading, error: createChatError, data } = mutationResult;

  const onClose = () => {
    setError("");
    setName("");
    handleClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>

          <TextField
            label="Name"
            required
            error={!!error}
            helperText={error}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={async () => {
              if (!name.length) {
                setError("Chat name is required");
                return;
              }

              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: { name },
                  },
                });
                onClose();
                router.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch (error) {
                setError(UNKNOWN_ERROR_MESSSAGE);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
