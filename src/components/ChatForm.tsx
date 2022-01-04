import React, { useState } from "react";
import Input from "components/UI/Input";
import { ReactComponent as SendMessage } from "assets/images/send-message.svg";
import { useChat } from "contexts/chat-context";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const ChatForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useChat();

  const handleNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message && selectedUser && auth.currentUser) {
      const user1 = auth.currentUser.uid;
      const user2 = selectedUser.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      await addDoc(collection(db, "chats", id, "messages"), {
        message,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setMessage("");
    }
  };

  return (
    <form onSubmit={handleNewMessage} className="flex items-center justify-center w-full">
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
      <button type="submit">
        <SendMessage className="w-12 h-12 p-3 cursor-pointer" />
      </button>
    </form>
  );
};

export default ChatForm;
