import { useMutation } from "@apollo/client";
import Search from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CreateChatDocument } from "../../../config/gql/generated";

interface CHAT_LIST_PROPS {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd = ({ open, handleClose }: CHAT_LIST_PROPS) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>();
  const [createChat] = useMutation(CreateChatDocument);

  return (
    <Modal open={open} onClose={handleClose}>
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
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked
                  value={isPrivate}
                  onChange={(e) => setIsPrivate(e?.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
              <IconButton>
                <Search />
              </IconButton>
            </Paper>
          ) : (
            <TextField label="Name" onChange={(e) => setName(e.target.value)} />
          )}
          <Button
            variant="outlined"
            onClick={() =>
              createChat({
                variables: {
                  createChatInput: { isPrivate, name: name || undefined },
                },
              })
            }
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
