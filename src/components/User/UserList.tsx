import React, { useEffect, useState } from "react";
import UserListItem from "components/User/UserListItem";
import Input from "components/UI/Input/Input";
import Spinner from "components/UI/Spinner/Spinner";
import getUsers from "services/user";
import { User } from "types/user";
import classes from "./UserList.module.css";

const inputStyles = {
  width: "94%",
  background: "#ececec",
};

const spinnerStyles = {
  width: "5rem",
  height: "5rem",
  borderLeft: "0.3em solid #71af74",
  marginTop: "1rem",
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      getUsers(search)
        .then((userList: User[]) => {
          setUsers(userList);
        })
        .catch((_err) => {
          setError("Something went wrong, try again later");
        })
        .finally(() => setIsLoading(false));
    }, 200);
    return (): void => clearTimeout(timeoutId);
  }, [search]);

  return (
    <section className={classes["user-list"]}>
      <h1 style={{ margin: 0 }}>Find people to start chatting</h1>
      <Input
        placeholder="Search people..."
        type="text"
        value={search}
        style={inputStyles}
        onChange={(event): void => setSearch(event.target.value)}
      />
      {isLoading && <Spinner style={spinnerStyles} />}
      {!isLoading && users.length !== 0 && (
        <ul>
          {users.map((user) => (
            <UserListItem key={user.email} user={user} />
          ))}
        </ul>
      )}
      {!error && !isLoading && users.length === 0 && <h1>‍Could not find users with this criteria 😵‍💫</h1>}
      {error && <h1>{error}</h1>}
    </section>
  );
};

export default UserList;
