import React, { useState } from "react";
import { auth } from "firebase/index";
import googleImg from "assets/images/google.png";
import Spinner from "components/UI/Spinner/Spinner";
import classes from "./LoginForm.module.css";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (email && password && !isLoading) {
      if (emailPattern.test(email)) {
        try {
          setIsLoading(true);
          await auth.signInWithEmailAndPassword(email, password);
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
      <input
        className={classes["login-input"]}
        id="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event): void => setEmail(event.target.value)}
      />
      <input
        className={classes["login-input"]}
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event): void => setPassword(event.target.value)}
      />
      {error && <p className={classes["login-error"]}>{error}</p>}
      <button type="submit" className={classes["login-btn"]}>
        {isLoading ? <Spinner /> : <span>Login</span>}
      </button>
      <p>
        Don&apos;t have an account yet? <a href="asd">Sign up</a>
      </p>
      <img src={googleImg} alt="Google" width="32" />
    </form>
  );
};

export default LoginForm;
