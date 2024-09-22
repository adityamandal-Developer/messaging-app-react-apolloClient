import { useMutation } from "@apollo/client";
import { ChatsDocument, CreateChatDocument } from "../config/gql/generated";

const useCreateChat = () => {
  const [createChat, mutationResult] = useMutation(CreateChatDocument, {
    update(cache, { data }) {
      if (!data) return;

      const existingChats = cache.readQuery<{ chats: any[] }>({
        query: ChatsDocument,
      });

      const chats = existingChats?.chats || [];
      const newChat = data.createChat;

      cache.writeQuery({
        query: ChatsDocument,
        data: {
          chats: [...chats, newChat],
        },
      });
    },
  });

  // Return both the mutation function and the result separately
  return { createChat, mutationResult };
};

export { useCreateChat };
