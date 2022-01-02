import React, { useState } from "react";
import googleImg from "assets/images/google.png";
import Input from "components/UI/Input";
import Button from "components/UI/Button";
import { emailRegex } from "utils/utils";
import { auth } from "fb/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseErrorCodes } from "enums/enums";
import { signInWithGoogle } from "services/auth";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      if (!emailRegex.test(email)) setError("Invalid email address");
      else {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/", { replace: true });
        } catch (err) {
          if (err instanceof FirebaseError) {
            if (err.code === FirebaseErrorCodes.WRONG_PASSWORD || err.code === FirebaseErrorCodes.USER_NOT_FOUND)
              setError("Incorrect credentials");
          } else {
            toast.error("Something went wrong. Please try later");
          }
        }
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError && err.code === FirebaseErrorCodes.CLOSED_BY_USER) return;
      toast.error("Something went wrong. Please try later");
    }
  };

  return (
    <div className="px-5 pt-5 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleLoginSubmit} className="flex flex-col items-center p-5 w-80">
        <h2 className="mb-8 text-3xl font-bold">React Chat App</h2>
        <Input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        {error && <p className="w-11/12 pb-0 text-red-600">{error}</p>}
        <Button type="submit" label="Login" className="mt-8" />
        <p className="mt-6">
          Don&apos;t have an account yet?{" "}
          <Link to="../signup" className="underline text-emerald-600">
            Sign up
          </Link>
        </p>
        <button
          className="p-1 mt-2 cursor-pointer hover:bg-emerald-100 rounded-3xl"
          type="button"
          onClick={handleLoginWithGoogle}
        >
          <img src={googleImg} alt="Google" width="32" />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
