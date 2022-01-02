import { auth, db } from "fb/index";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { child, push, ref } from "firebase/database";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credentials = await signInWithPopup(auth, provider);

  if (getAdditionalUserInfo(credentials)?.isNewUser) {
    const { user } = credentials;
    await updateProfile(user, { displayName: user.displayName });
    await push(child(ref(db), "/users"), {
      id: user.uid,
      email: user.email,
      username: user.displayName,
      photoURL: user.photoURL,
    });
  }
};

export const signUp = async (email: string, password: string, username: string) => {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  if (credentials.user) {
    const { user } = credentials;
    await updateProfile(user, { displayName: username });
    await push(child(ref(db), "/users"), {
      id: user.uid,
      email,
      username,
      photoURL: user.photoURL,
    });
  }
};
