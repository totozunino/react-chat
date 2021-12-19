import React from "react";

type InputType = "text" | "password" | "number";

export interface InputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: InputType;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, onChange, value, type = "text", className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className={`rounded bg-gray-100 w-11/12 p-3 m-3 ${className}`}
  />
);

export default Input;
