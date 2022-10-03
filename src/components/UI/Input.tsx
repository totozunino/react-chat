import { FC, InputHTMLAttributes, ChangeEvent } from "react";

export interface InputProps {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
}

const Input: FC<InputProps> = ({ placeholder, onChange, value, type = "text", className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className={`rounded bg-gray-100 dark:bg-input-dark w-11/12 p-3 m-3 ${className}`}
  />
);

export default Input;
