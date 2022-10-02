import { useState, FC, FormEvent } from "react";
import Input from "components/UI/Input";
import Button from "components/UI/Button";
import { emailRegex } from "utils/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseErrorCodes, Routes } from "enums/enums";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import GoogleButton from "./GoogleButton";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (email && password) {
      if (!emailRegex.test(email)) setError("Invalid email address");
      else {
        setIsLoading(true);
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          await updateDoc(doc(db, "users", user.uid), {
            isOnline: true,
          });
          setIsLoading(false);
          navigate("/", { replace: true });
        } catch (err) {
          setIsLoading(false);
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

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="flex flex-col items-center p-10 pb-5 bg-white rounded-lg shadow-xl dark:bg-secondary-dark"
    >
      <h2 className="mb-8 text-3xl font-bold">React Chat App</h2>
      <Input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
      <Input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
      />
      {error && <p className="w-11/12 pb-0 text-red-600">{error}</p>}
      <Button type="submit" text="Login" className="mt-8" loading={isLoading} />
      <p className="mt-6">
        Don&apos;t have an account yet?{" "}
        <Link to={{ pathname: Routes.SIGN_UP }} className="underline text-emerald-600">
          Sign up
        </Link>
      </p>
      <GoogleButton />
    </form>
  );
};

export default LoginForm;
