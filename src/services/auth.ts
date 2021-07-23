import { db, auth, UserCredential } from "firebase/index";

export async function register(email: string, password: string, username: string): Promise<void> {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  if (userCredential.user) {
    await userCredential.user.updateProfile({ displayName: username });
    await db
      .ref("/users")
      .push({ id: userCredential.user.uid, email, username, photoURL: userCredential.user.photoURL });
  }
}

export function login(email: string, password: string): Promise<UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return auth.signOut();
}
