import { useMutation } from "@apollo/client";
import { ChatsDocument, CreateChatDocument } from "../config/gql/generated";

const useCreateChat = () => {
  const createChat = useMutation(CreateChatDocument, {
    update(cache, { data }) {
      if (!data) return;

      //existing chats
      const existingChats = cache.readQuery({
        query: ChatsDocument,
      });

      // Create a new chat
      const newChat = data.createChat;

      // Update the cache with the new chat
      cache.writeQuery({
        query: ChatsDocument,
        data: {
          chats: [...existingChats!.chats, newChat],
        },
      });
    },
  });
  return createChat;
};
export { useCreateChat };
// const [createChat] = useMutation(CreateChatDocument, {
//   refetchQueries: ["Chats"],
// });
