import React from "react";
import { AuthProvider } from "contexts/auth-context";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
