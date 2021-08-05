import { db } from "firebase/index";
import { User } from "types/user";

export default async function getUsers(search: string): Promise<User[]> {
  const snapshot = await db.ref("/users").get();
  const rawUsers = snapshot.val();
  const rawUsersKeys = Object.keys(rawUsers);
  let users: User[] = rawUsersKeys.map((userKey: string) => rawUsers[userKey]);
  if (search) users = users.filter((user) => user.username.includes(search) || user.email.includes(search));
  return users;
}
