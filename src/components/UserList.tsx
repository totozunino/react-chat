import React, { useEffect, useState } from "react";
import Input from "components/UI/Input";
import Loader from "components/UI/Loader";
import UserItem from "components/UserItem";
import getUsers from "services/users";
import { User } from "types/user";
import { toast } from "react-toastify";

const UserList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isLoading) setIsLoading(true);
    const timeoutId = setTimeout(() => {
      getUsers(search)
        .then((data) => {
          setUsers(data);
        })
        .catch(() => toast.error("Something went wrong. Please try later"))
        .finally(() => setIsLoading(false));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="p-3">
      <Input
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        placeholder="Search people..."
        className="bg-gray-200"
      />
      {isLoading && <Loader />}
      {!isLoading && users.map((user) => <UserItem key={user.id} user={user} />)}
      {!isLoading && !users.length && (
        <h1 className="my-8 text-2xl font-bold">Could not find users with that criteria 😵‍💫</h1>
      )}
    </div>
  );
};

export default UserList;
