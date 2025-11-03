"use client";
import { ChevronRight } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "outlined" | "text-icon";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={` ${variant} w-40 h-12 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}

      {variant == "text-icon" && <ChevronRight className="text-primary " />}
    </button>
  );
};

export default Button;
