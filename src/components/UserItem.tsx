import React from "react";
import AvatarImg from "assets/images/avatar.png";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";
import { User } from "types/user";

export interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const navigate = useNavigate();
  const { email, id, photoURL, username } = user;

  return (
    <div className="flex items-center p-8 my-6 bg-white shadow-md dark:bg-secondary-dark rounded-tl-3xl rounded-br-3xl">
      <div className="hidden">{id}</div>
      <img src={photoURL || AvatarImg} alt="User Profile Pic" className="w-12 rounded-full" />
      <div className="px-3 text-left max-w-44 sm:max-w-full">
        <p className="text-lg font-bold truncate">{username}</p>
        <p className="text-sm truncate font-extralight">{email}</p>
      </div>
      <div className="ml-auto text-xs">
        <Button
          label="Start conversation"
          type="button"
          onClick={() => navigate("/chat")}
          className="hidden sm:block"
        />
        <Button label="💬" type="button" className="block sm:hidden" onClick={() => navigate("/chat")} />
      </div>
    </div>
  );
};

export default UserItem;
