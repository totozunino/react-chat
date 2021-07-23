import React, { useState, useContext, useEffect } from "react";
import { auth } from "firebase/index";
import firebase from "firebase/app";

type AuthContextProps = {
  currentUser?: firebase.User | null;
  isAuthenticated?: boolean;
};

const AuthContext = React.createContext<AuthContextProps>({});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user != null);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
