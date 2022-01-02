import React, { useState } from "react";
import googleImg from "assets/images/google.png";
import Input from "components/UI/Input";
import Button from "components/UI/Button";
import { emailRegex } from "utils/utils";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseErrorCodes } from "enums/enums";
import { signInWithGoogle, signUp } from "services/auth";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username && email && password) {
      if (!emailRegex.test(email)) setError("Invalid email address");
      else {
        try {
          await signUp(email, password, username);
          navigate("/", { replace: true });
        } catch (err) {
          if (err instanceof FirebaseError) {
            if (err.code === FirebaseErrorCodes.WEAK_PASSWORD) setError("Password must be greater than 6 characters");
            if (err.code === FirebaseErrorCodes.EMAIL_IN_USE) setError("That email is already registred");
          } else {
            toast.error("Something went wrong. Please try later");
          }
        }
      }
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Something went wrong. Please try later");
    }
  };

  return (
    <div className="px-5 pt-5 bg-white rounded-lg shadow-xl">
      <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center p-5 w-80">
        <h2 className="mb-8 text-3xl font-bold">React Chat App</h2>
        <Input value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
        <Input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        {error && <p className="w-11/12 pb-0 text-red-600">{error}</p>}
        <Button type="submit" label="Register" className="mt-8" />
        <p className="mt-6">
          Already have an account?{" "}
          <Link to="../login" className="underline text-emerald-600">
            Log in
          </Link>
        </p>
        <button
          className="p-1 mt-2 cursor-pointer hover:bg-emerald-100 rounded-3xl"
          type="button"
          onClick={handleSignUpWithGoogle}
        >
          <img src={googleImg} alt="Google" width="32" />
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
