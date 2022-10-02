import { FC } from "react";
import { signInWithGoogle } from "services/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorCodes } from "enums/enums";
import { toast } from "react-toastify";
import googleImg from "assets/images/google.png";
import { db } from "../firebase";

const GoogleButton: FC = () => {
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      await updateDoc(doc(db, "users", user.uid), {
        isOnline: true,
      });
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError && err.code === FirebaseErrorCodes.CLOSED_BY_USER) return;
      toast.error("Something went wrong. Please try later");
    }
  };

  return (
    <button
      className="p-1 mt-2 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-3xl"
      type="button"
      onClick={handleLoginWithGoogle}
    >
      <img src={googleImg} alt="Google" width="32" />
    </button>
  );
};

export default GoogleButton;
