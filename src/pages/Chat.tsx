import React from "react";
import Header from "components/Header";
import ChatList from "components/ChatList";
import ChatContainer from "components/ChatContainer";

const Chat: React.FC = () => (
  <>
    <Header />
    <main className="flex justify-center h-full mt-[73px] sm:mt-0">
      <div className="flex w-screen p-2 bg-white dark:bg-secondary-dark rounded-md shadow-xl mx-5% my-3%">
        <ChatList />
        <ChatContainer />
      </div>
    </main>
  </>
);

export default Chat;
