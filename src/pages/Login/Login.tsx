import React from "react";
import backgroundImg from "assets/images/background.png";
import LoginForm from "components/LoginForm/LoginForm";
import Card from "components/UI/Card/Card";
import classes from "./Login.module.css";

const Login: React.FC = () => (
  <div className={classes.login}>
    <Card>
      <LoginForm />
    </Card>
    <img src={backgroundImg} alt="Cool background" />
  </div>
);

export default Login;
