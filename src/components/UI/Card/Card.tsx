import React from "react";
import classes from "./Card.module.css";

type CardProps = {
  style?: Record<string, unknown>;
};

const Card: React.FC<CardProps> = ({ children, style }) => (
  <div className={classes.card} style={style}>
    {children}
  </div>
);

export default Card;
