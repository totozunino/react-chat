import React, { useState, useEffect } from "react";
import AvatarImg from "assets/images/avatar.png";
import { useChat } from "contexts/chat-context";
import { User } from "types/user";
import { Message } from "types/chat";
import { collection, CollectionReference, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase";

interface ChatItemProps {
  user: User;
}

const ChatItem: React.FC<ChatItemProps> = ({ user }) => {
  const { setSelectedUser, setMessages, selectedUser } = useChat();
  const [lastMessage, setLastMessage] = useState<Message>();
  const { photoURL, username, isOnline } = user;
  const isSelected = selectedUser?.id === user.id;
  const isMine = lastMessage?.from === auth.currentUser?.uid;

  const handleSelectChat = () => {
    setSelectedUser(user);

    if (auth.currentUser) {
      const user1 = auth.currentUser.uid;
      const user2 = user.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const messagesRef = collection(db, "chats", id, "messages") as CollectionReference<Message>;
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        const msgs: Message[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMessages(msgs);
      });
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      const user1 = auth.currentUser.uid;
      const user2 = user.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const messagesRef = collection(db, "chats", id, "messages") as CollectionReference<Message>;
      const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setLastMessage(doc.data());
        });
      });
      return () => unSubscribe();
    }
    return undefined;
  }, []);

  return (
    <li
      className={`flex items-center my-2 cursor-pointer p-2 ${
        isSelected ? " border-l-2 border-emerald-500 bg-gray-100 dark:bg-input-dark" : ""
      }`}
      onClick={handleSelectChat}
      aria-hidden="true"
    >
      <div className="relative">
        <img src={photoURL || AvatarImg} alt="User Profile Pic" className="w-12 rounded-full" />
        <div
          className={`w-3 h-3 absolute bottom-0 right-0 border rounded-full ${
            isOnline ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
      </div>
      <div className="relative p-2 max-w-4/5">
        <p className="font-bold">{username}</p>
        {lastMessage && (
          <p className="text-xs text-gray-500 truncate">
            {isMine ? `Me: ${lastMessage.message}` : lastMessage.message}
          </p>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
