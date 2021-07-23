import React, { useState } from "react";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";
import Input, { useInput } from "components/UI/Input/Input";
import googleImg from "assets/images/google.png";
import { register } from "services/auth";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./SignUpForm.module.css";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const buttonStyles = {
  margin: "25px 0 15px",
};

const SignUpForm: React.FC = () => {
  const username = useInput<string>("");
  const email = useInput<string>("");
  const password = useInput<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (email.value && password.value && username.value && !isLoading) {
      if (emailPattern.test(email.value)) {
        if (password.value.length >= 6) {
          try {
            setIsLoading(true);
            await register(email.value, password.value, username.value);
            setIsLoading(false);
            history.push("/login");
            toast.success("👌 Your account was created successfully", {
              style: { backgroundColor: "#71af74" },
            });
          } catch (err) {
            setIsLoading(false);
            if (err.code === "auth/email-already-in-use") {
              setError("A user with this email already exists");
            } else {
              toast.error("Something went wrong, try again later");
            }
          }
        } else {
          setError("Password must have at least 6 characters");
        }
      } else {
        setError("Invalid email address");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes["sign-up-form"]}>
      <h1 className={classes["sign-up-title"]}>Sign Up</h1>
      <Input type="text" placeholder="Username" value={username.value} onChange={username.onChange} />
      <Input type="text" placeholder="Email" value={email.value} onChange={email.onChange} />
      <Input type="password" placeholder="Password" value={password.value} onChange={password.onChange} />
      {error && (
        <p data-testid="error" className={classes["sign-up-error"]}>
          {error}
        </p>
      )}
      <Button type="submit" style={buttonStyles}>
        {isLoading ? <Spinner /> : <span>Register</span>}
      </Button>
      <p>
        Already have an account? <Link to="login">Log in</Link>
      </p>
      <img src={googleImg} alt="Google" width="32" />
    </form>
  );
};

export default SignUpForm;
