import { User } from "types/user";
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function getUsers(search: string): Promise<User[]> {
  const users: User[] = [];

  const usersRef = collection(db, "users") as CollectionReference<User>;
  const q = query(usersRef, where("id", "not-in", [auth.currentUser?.uid]));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    if (
      doc.data().username.toLowerCase().includes(search.toLowerCase()) ||
      doc.data().username.toLowerCase().includes(search.toLowerCase())
    )
      users.push(doc.data());
  });

  return users;
}
