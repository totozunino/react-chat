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
            if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found")
              setError("Incorrect credentials");
          } else {
            toast.error("Something went wrong. Please try later");
          }
        }
      }
    }
  };

  return (
    <div className="bg-white px-5 pt-5 rounded-lg shadow-xl">
      <form onSubmit={handleLoginSubmit} className="flex flex-col items-center p-5 w-80">
        <h2 className="font-bold text-3xl mb-8">React Chat App</h2>
        <Input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        {error && <p className="text-red-600 w-11/12 pb-0">{error}</p>}
        <Button type="submit" label="Login" className="mt-8" />
        <p className="mt-6">
          Don&apos;t have an account yet?{" "}
          <Link to="../signup" className="text-emerald-600 underline">
            Sign up
          </Link>
        </p>
        <div className="cursor-pointer hover:bg-emerald-100 rounded-3xl p-1 mt-2">
          <img src={googleImg} alt="Google" width="32" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
