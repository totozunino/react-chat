import React, { useState, useContext, useMemo, useEffect } from "react";
import { auth } from "fb/index";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextProps = {
  currentUser: User | null;
};

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsPending(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ currentUser }), [currentUser]);

  if (isPending) return <div />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
