import React from "react";
import { AuthProvider } from "contexts/auth-context";
import Login from "pages/Login/Login";

const App: React.FC = () => (
  <AuthProvider>
    <Login />
  </AuthProvider>
);

export default App;
