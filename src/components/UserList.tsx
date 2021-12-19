import React, { useEffect, useState } from "react";
import Input from "components/UI/Input";
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
      {isLoading && (
        <div className="flex items-center justify-center my-8 space-x-2">
          <div
            className="inline-block w-10 h-10 rounded-full shadow-lg delay-50 bg-emerald-600 shadow-emerald-500/25 animate-pulse"
            role="status"
          />
        </div>
      )}
      {!isLoading && users.map((user) => <UserItem key={user.id} {...user} />)}
      {!isLoading && !users.length && (
        <h1 className="my-8 text-2xl font-bold">Could not find users with that criteria 😵‍💫</h1>
      )}
    </div>
  );
};

export default UserList;
