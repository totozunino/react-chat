import { useAuth } from "contexts/auth-context";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (): JSX.Element => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default PrivateRoute;
