import { FC, useEffect, useState } from "react";
import ChatForm from "components/ChatForm";
import { useChat } from "contexts/chat-context";
import AvatarImg from "assets/images/avatar.png";
import { collection, CollectionReference, onSnapshot, orderBy, query } from "firebase/firestore";
import { Message } from "types/chat";
import MessageItem from "components/MessageItem";
import { auth, db } from "../firebase";

const ChatContainer: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedUser } = useChat();

  useEffect(() => {
    const messagesList = document.getElementById("messages-list") as HTMLUListElement;
    if (messagesList) messagesList.scrollTop = messagesList.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (auth.currentUser && selectedUser) {
      const user1 = auth.currentUser.uid;
      const user2 = selectedUser.id;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const messagesRef = collection(db, "chats", id, "messages") as CollectionReference<Message>;
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs: Message[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMessages(msgs);
      });

      return () => unSubscribe();
    }

    return undefined;
  }, [selectedUser]);

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

          <ul
            className="w-full p-4 overflow-y-auto bg-gray-100 bg-center bg-cover border-t dark:border-input-dark dark:bg-secondary-dark h-60vh"
            id="messages-list"
          >
            {messages.map((message) => (
              <MessageItem key={message.createdAt.toString()} message={message} />
            ))}
          </ul>

          <ChatForm />
        </>
      ) : (
        <h1 className="flex items-center my-8 text-2xl font-bold h-60vh">Select a user to start a conversation 💬</h1>
      )}
    </div>
  );
};

export default ChatContainer;
