import React from "react";
import ChatForm from "components/ChatForm";
import MessageList from "components/MessageList";
import { useChat } from "contexts/chat-context";
import AvatarImg from "assets/images/avatar.png";

const ChatContainer: React.FC = () => {
  const { selectedUser } = useChat();

  return (
    <div className="flex flex-col items-center w-full">
      {selectedUser ? (
        <>
          <div className="flex items-center w-full px-8 py-1">
            <div className="relative">
              <img src={selectedUser.photoURL || AvatarImg} alt="User Profile Pic" className="w-12 rounded-full" />
              <div
                className={`w-3 h-3 absolute bottom-0 right-0 border rounded-full ${
                  selectedUser.isOnline ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
            </div>
            <p className="px-2 font-bold">{selectedUser.username}</p>
          </div>
          <MessageList />
          <ChatForm />
        </>
      ) : (
        <h1 className="flex items-center my-8 text-2xl font-bold h-60vh">Select a user to start a conversation 💬</h1>
      )}
    </div>
  );
};

export default ChatContainer;
