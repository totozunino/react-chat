import React, { useState } from "react";
import { login } from "services/auth";
import googleImg from "assets/images/google.png";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";
import Input, { useInput } from "components/UI/Input/Input";
import { Link, useHistory } from "react-router-dom";
import classes from "./LoginForm.module.css";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const buttonStyles = {
  margin: "25px 0 15px",
};

const LoginForm: React.FC = () => {
  const email = useInput<string>("");
  const password = useInput<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (email.value && password.value && !isLoading) {
      if (emailPattern.test(email.value)) {
        try {
          setIsLoading(true);
          await login(email.value, password.value);
          history.replace("/");
        } catch (err) {
          if (err.code === "auth/user-not-found") {
            setError("Incorrect credentials");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Invalid email address");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes["login-form"]}>
      <h1 className={classes["login-title"]}>React Chat App</h1>
      <Input type="text" placeholder="Email" value={email.value} onChange={email.onChange} />
      <Input type="password" placeholder="Password" value={password.value} onChange={password.onChange} />
      {error && (
        <p className={classes["login-error"]} data-testid="error">
          {error}
        </p>
      )}
      <Button type="submit" style={buttonStyles}>
        {isLoading ? <Spinner /> : <span>Login</span>}
      </Button>
      <p>
        Don&apos;t have an account yet? <Link to="signup">Sign up</Link>
      </p>
      <img src={googleImg} alt="Google" width="32" />
    </form>
  );
};

export default LoginForm;
