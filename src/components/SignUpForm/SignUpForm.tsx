import React, { useState } from "react";
import Spinner from "components/UI/Spinner/Spinner";
import Input, { useInput } from "components/UI/Input/Input";
import googleImg from "assets/images/google.png";
import { auth } from "firebase/index";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./SignUpForm.module.css";

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpForm: React.FC = () => {
  const username = useInput<string>("");
  const email = useInput<string>("");
  const password = useInput<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (email.value && password.value && !isLoading) {
      if (emailPattern.test(email.value)) {
        if (password.value.length >= 6) {
          try {
            setIsLoading(true);
            const userCredentials = await auth.createUserWithEmailAndPassword(email.value, password.value);
            if (userCredentials.user) await userCredentials.user.updateProfile({ displayName: username.value });
            history.push("/login");
            toast.success("👌 Your account was created successfully", {
              style: { backgroundColor: "#71af74" },
            });
          } catch (err) {
            if (err.code === "auth/email-already-in-use") {
              setError("A user with this email already exists");
            }
          } finally {
            setIsLoading(false);
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
      {error && <p className={classes["sign-up-error"]}>{error}</p>}
      <button type="submit" className={classes["sign-up-btn"]}>
        {isLoading ? <Spinner /> : <span>Login</span>}
      </button>
      <p>
        Already have an account? <Link to="login">Login in</Link>
      </p>
      <img src={googleImg} alt="Google" width="32" />
    </form>
  );
};

export default SignUpForm;
