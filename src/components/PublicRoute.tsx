import { FC } from "react";
import { useAuth } from "contexts/auth-context";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PublicRoute: FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
};

export default PublicRoute;
