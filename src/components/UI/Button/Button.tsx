import React from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  type: "button" | "reset" | "submit";
  style?: Record<string, unknown>;
};

const Button: React.FC<ButtonProps> = ({ type, style, children }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={classes.btn} style={style}>
    {children}
  </button>
);
export default Button;
