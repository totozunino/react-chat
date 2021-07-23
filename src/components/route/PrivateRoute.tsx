import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

type PrivateRouteProps = {
  exact?: boolean;
  path: string;
  redirect?: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, exact = true, path, redirect = "/login" }) => {
  const auth = useAuth();

  return (
    <Route
      exact={exact}
      path={path}
      render={(): React.ReactNode => (auth.isAuthenticated ? children : <Redirect to={redirect} />)}
    />
  );
};

export default PrivateRoute;
