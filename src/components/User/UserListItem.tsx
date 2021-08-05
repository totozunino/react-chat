import React from "react";
import { User } from "types/user";
import Card from "components/UI/Card/Card";
import Button from "components/UI/Button/Button";
import avatarImg from "assets/images/avatar.png";
import classes from "./UserListItem.module.css";

type UserListItemProps = {
  user: User;
};

const buttonStyles = {
  fontSize: "12px",
};

const cardStyles = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

const UserListItem: React.FC<UserListItemProps> = ({ user }) => (
  <li className={classes["user-list-item"]}>
    <Card style={cardStyles}>
      <img src={avatarImg} alt="Avatar" width="64" />
      <div className={classes.content}>
        <h3 className={classes.username}>{user.username}</h3>
        <p className={classes.email}>{user.email}</p>
      </div>
      <Button type="button" style={buttonStyles}>
        Start a conversation
      </Button>
    </Card>
  </li>
);

export default UserListItem;
