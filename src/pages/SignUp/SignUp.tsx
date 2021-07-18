import React from "react";
import backgroundImg from "assets/images/background.png";
import Card from "components/UI/Card/Card";
import SignUpForm from "components/SignUpForm/SignUpForm";
import classes from "./SignUp.module.css";

const SignUp: React.FC = () => (
  <div className={classes["sign-up"]}>
    <Card>
      <SignUpForm />
    </Card>
    <img src={backgroundImg} alt="Cool background" />
  </div>
);

export default SignUp;
