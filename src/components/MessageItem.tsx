import React from "react";
import { formatDistance } from "date-fns";
import { Message } from "types/chat";
import { auth } from "../firebase";

export interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isMine = message.from === auth.currentUser?.uid;

  return (
    <li
      className={`text-white max-w-prose flex flex-col relative px-4 pt-3 bg-fixed bg-gradient-to-b from-emerald-500 to-green-700 w-fit ${
        isMine
          ? "ml-auto rounded-lg rounded-br-none mb-2 pr-2 text-right"
          : "mr-auto rounded-lg rounded-bl-none mb-2 pl-2 text-left"
      }`}
    >
      {message.message}
      {message.media && <img src={message.media} alt="message pic" className="max-w-xs" />}
      {message.audio && (
        <audio controls src={message.audio}>
          <track kind="captions" />
        </audio>
      )}
      <small className="text-xs">{formatDistance(message.createdAt.toDate(), Date.now(), { addSuffix: true })}</small>
    </li>
  );
};

export default MessageItem;
