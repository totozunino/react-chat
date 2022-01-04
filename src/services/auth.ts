import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credentials = await signInWithPopup(auth, provider);

  if (getAdditionalUserInfo(credentials)?.isNewUser) {
    const { user } = credentials;
    await updateProfile(user, { displayName: user.displayName });
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      username: user.displayName,
      photoURL: user.photoURL,
      isOnline: true,
    });
  }
  return credentials;
};

export const signUp = async (email: string, password: string, username: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (user) {
    await updateProfile(user, { displayName: username });
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email,
      username,
      photoURL: user.photoURL,
      isOnline: true,
    });
  }
};
