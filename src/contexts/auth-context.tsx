import React, { useState, useContext, useEffect, useMemo } from "react";
import { auth } from "fb/index";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextProps = {
  currentUser?: User | null;
};

const AuthContext = React.createContext<AuthContextProps>({});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
