import { useState, FormEvent, FC } from "react";
import Input from "components/UI/Input";
import Button from "components/UI/Button";
import { emailRegex } from "utils/utils";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseErrorCodes, Routes } from "enums/enums";
import { signUp } from "services/auth";
import GoogleButton from "./GoogleButton";

const SignUpForm: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (username && email && password) {
      if (!emailRegex.test(email)) setError("Invalid email address");
      else {
        setIsLoading(true);
        try {
          await signUp(email, password, username);
          setIsLoading(false);
          navigate("/", { replace: true });
        } catch (err) {
          setIsLoading(false);
          if (err instanceof FirebaseError) {
            if (err.code === FirebaseErrorCodes.WEAK_PASSWORD) setError("Password must be greater than 6 characters");
            if (err.code === FirebaseErrorCodes.EMAIL_IN_USE) setError("That email is already registered");
          } else {
            toast.error("Something went wrong. Please try later");
          }
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleRegisterSubmit}
      className="flex flex-col items-center p-10 pb-5 bg-white rounded-lg shadow-lg dark:bg-secondary-dark"
    >
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
      <Button type="submit" text="Register" className="mt-8" loading={isLoading} />
      <p className="mt-6">
        Already have an account?{" "}
        <Link to={{ pathname: Routes.LOGIN }} className="underline text-emerald-600">
          Log in
        </Link>
      </p>
      <GoogleButton />
    </form>
  );
};

export default SignUpForm;
