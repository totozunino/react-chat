import React from "react";
import Spinner from "components/UI/Spinner";

export interface ButtonProps {
  text: string;
  type: "submit" | "button" | "reset";
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, type, className = "", onClick, loading = false }) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
    className={`pointer text-white rounded p-3 border-none bg-gradient-to-r hover:opacity-90 transition-opacity from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 w-full ${className}`}
  >
    {loading ? <Spinner /> : text}
  </button>
);

export default Button;
