import { useMutation } from "@apollo/client";
import {
  CreateMessageDocument,
  MessagesDocument,
} from "../config/gql/generated";

const useCreateMessage = (_id: string) => {
  const [createMessageMutation] = useMutation(CreateMessageDocument, {
    update(cache, { data }) {
      if (!data || !data.createMessage) return;

      const existingMessages = cache.readQuery({
        query: MessagesDocument,
        variables: { chatId: _id },
      });

      const newMessage = data.createMessage;

      cache.writeQuery({
        query: MessagesDocument,
        variables: { chatId: _id },
        data: {
          messages: existingMessages?.messages
            ? [...existingMessages.messages, newMessage]
            : [newMessage],
        },
      });
    },
  });

  return createMessageMutation;
};

export { useCreateMessage };
