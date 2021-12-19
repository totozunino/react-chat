import React from "react";

export interface ButtonProps {
  label: string;
  type: "submit" | "button" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, type, className = "" }) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`pointer text-white rounded p-3 border-none bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 w-full ${className}`}
  >
    {label}
  </button>
);

export default Button;
