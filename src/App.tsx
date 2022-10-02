import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Home from "pages/Home";
import Chat from "pages/Chat";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

const App: React.FC = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route index element={<Home />} />
      <Route path="chat" element={<Chat />} />
    </Route>
  </Routes>
);

export default App;
