import React, { useState, useContext, useEffect } from "react";
import { auth } from "firebase/index";
import firebase from "firebase/app";

type AuthContextProps = {
  currentUser?: firebase.User | null;
};

const AuthContext = React.createContext<AuthContextProps>({});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
