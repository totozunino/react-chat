import React from "react";
import { useChat } from "contexts/chat-context";
import MessageItem from "components/MessageItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const MessageList: React.FC = () => {
  const { messages } = useChat();

  return (
    <ul className="w-full p-4 overflow-y-auto bg-gray-100 border-t h-60vh" id="messages-list">
      <TransitionGroup>
        {messages &&
          messages.map((message, index) => (
            <CSSTransition key={`${index + message.createdAt.toString()}`} classNames="message" timeout={300}>
              <MessageItem message={message} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </ul>
  );
};

export default MessageList;
