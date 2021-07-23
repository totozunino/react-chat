import React from "react";
import UserList from "components/User/UserList/UserList";
import Header from "components/Header/Header";

const Home: React.FC = () => (
  <>
    <Header />
    <main>
      <UserList />
    </main>
  </>
);

export default Home;
