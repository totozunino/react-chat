import React, { useEffect, useState } from "react";
import ChatItem from "components/ChatItem";
import Loader from "components/UI/Loader";
import { User } from "types/user";
import { collection, CollectionReference, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usersRef = collection(db, "users") as CollectionReference<User>;

    const q = query(usersRef, where("id", "not-in", [auth.currentUser?.uid]));

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      if (isLoading) setIsLoading(false);
      setChats(users);
    });

    return () => unSubscribe();
  }, []);

  return (
    <div className="py-4 border-r w-96">
      <h2 className="text-xl font-bold">Users</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="py-4">
          {chats.map((chat) => (
            <ChatItem key={chat.id} user={chat} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
