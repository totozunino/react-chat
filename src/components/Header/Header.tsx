import React from "react";
import { useAuth } from "contexts/auth-context";
import { logout } from "services/auth";
import { useHistory } from "react-router-dom";
import reactLogo from "assets/images/react-logo.png";
import avatarImg from "assets/images/avatar.png";
import logoutImg from "assets/images/logout.png";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const authContext = useAuth();
  const history = useHistory();

  const handleLogout = async (): Promise<void> => {
    await logout();
    history.replace("/login");
  };

  return (
    <header className={classes.header}>
      <img src={reactLogo} alt="React Logo" />
      <div>
        <h3 className={classes.title}>React Chat App</h3>
        <p className={classes.subtitle}>by @totoz</p>
      </div>
      <div className={classes.profile}>
        <h4>{authContext.currentUser?.displayName}</h4>
        <img src={avatarImg} alt="Avatar" width="54" />
        <img
          src={logoutImg}
          aria-hidden="true"
          data-testid="logout"
          onClick={handleLogout}
          className={classes.logout}
          alt="Logout"
          width="32"
        />
      </div>
    </header>
  );
};

export default Header;
