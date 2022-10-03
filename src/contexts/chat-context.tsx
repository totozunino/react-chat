import { useState, useContext, useMemo, Dispatch, SetStateAction, createContext, FC, ReactNode } from "react";
import { User } from "types/user";

type ChatContextProps = {
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
};

const ChatContext = createContext<ChatContextProps>({
  selectedUser: null,
  setSelectedUser: () => null,
});

export const ChatProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
    }),
    [selectedUser, setSelectedUser],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextProps => useContext(ChatContext);
