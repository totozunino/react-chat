import { db } from "fb/index";
import { ref, get, child } from "firebase/database";
import { User } from "types/user";

export default async function getUsers(search: string): Promise<User[]> {
  const users: User[] = [];

  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "/users"));

  snapshot.forEach((element) => {
    const user: User = element.val();

    if (
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    )
      users.push(user);
  });

  return users;
}
