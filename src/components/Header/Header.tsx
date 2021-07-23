import React from "react";
import reactLogo from "assets/images/react-logo.png";
import classes from "./Header.module.css";

const Header: React.FC = () => (
  <header className={classes.header}>
    <img src={reactLogo} alt="React Logo" />
    <div>
      <h3 className={classes.title}>React Chat App</h3>
      <p className={classes.subtitle}>by totoz</p>
    </div>
  </header>
);

export default Header;
