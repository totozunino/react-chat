import { FC } from "react";
import SignUpForm from "components/SignUpForm";

const SignUp: FC = () => (
  <main className="flex items-center justify-center h-screen bg-center bg-cover bg-gray-50 dark:bg-primary-dark bg-chat-pattern">
    <SignUpForm />
  </main>
);

export default SignUp;
