import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const defaultClassName =
  "bg-gray-700 text-black p-2 rounded-md shadow-md hover:bg-gray-800 font-medium";

const Button = ({ children, className, onClick, type }: ButtonProps) => {
  return (
    <button
      className={`${defaultClassName} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
