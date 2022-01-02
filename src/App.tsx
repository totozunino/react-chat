import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Home from "pages/Home";
import ProtectedRoute from "components/ProtectedRoute";
import { useAuth } from "contexts/auth-context";

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
