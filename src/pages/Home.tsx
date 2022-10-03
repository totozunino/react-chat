import { FC } from "react";
import Header from "components/Header";
import UserList from "components/UserList";

const Home: FC = () => (
  <>
    <Header />
    <main className="flex justify-center h-full mt-[73px] sm:mt-0">
      <div className="w-full max-w-xl mx-auto mt-10 text-center lg:max-w-3xl">
        <h1 className="text-2xl font-bold">Find people to start chatting</h1>
        <UserList />
      </div>
    </main>
  </>
);

export default Home;
