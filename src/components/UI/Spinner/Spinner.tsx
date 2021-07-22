import React from "react";
import classes from "./Spinner.module.css";

type SpinnerProps = {
  style?: Record<string, unknown>;
};

const Spinner: React.FC<SpinnerProps> = ({ style }) => <div className={classes.loader} style={style} />;

export default Spinner;
