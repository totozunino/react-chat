import React, { useState, useContext, useMemo, useEffect } from "react";
import { Message } from "types/chat";
import { User } from "types/user";

type ChatContextProps = {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatContext = React.createContext<ChatContextProps>({
  selectedUser: null,
  setSelectedUser: () => {},
  messages: [],
  setMessages: () => {},
});

export const ChatProvider: React.FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesList = document.getElementById("messages-list") as HTMLUListElement;
    if (messagesList) messagesList.scrollTop = messagesList.scrollHeight;
  }, [messages]);

  const value = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
      messages,
      setMessages,
    }),
    [selectedUser, setSelectedUser, messages, setMessages],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextProps => useContext(ChatContext);
