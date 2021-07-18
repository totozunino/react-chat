import React, { useState } from "react";
import classes from "./Input.module.css";

type UseInputType<T> = {
  value: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useInput = <T extends string | number>(initialValue: T): UseInputType<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value as T);
  };

  return {
    value,
    onChange: handleChange,
  };
};

type InputProps = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "text" | "password" | "number";
};

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => (
  <input className={classes.input} type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

export default Input;
