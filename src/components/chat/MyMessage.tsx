import { Message } from "../../config/gql/generated";
import { convertDate } from "../../utils/convertDate";

interface IPROPS {
  message: Message;
}

const MyMessage = ({ message }: IPROPS) => {
  return (
    <div key={message._id} className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-header">
        Anakin
        <time className="text-xs opacity-50 ml-2">
          {convertDate(message.createdAt)}
        </time>
      </div>
      <div className="chat-bubble">{message.content}</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default MyMessage;
