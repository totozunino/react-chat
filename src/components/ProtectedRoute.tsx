import React from "react";
import { useAuth } from "contexts/auth-context";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
