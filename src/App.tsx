import React from "react";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import Home from "pages/Home/Home";
import PrivateRoute from "components/route/PrivateRoute";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

const App: React.FC = () => {
  const auth = useAuth();

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <Route path="/login">{auth.isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/signup">{auth.isAuthenticated ? <Redirect to="/" /> : <SignUp />}</Route>
      </Switch>
    </Router>
  );
};

export default App;
