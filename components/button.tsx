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
  ...props
}) => {
  return (
    <button className={`${className} ${variant} w-40 h-12 `} {...props}>
      {children}

      {variant == "text-icon" && <ChevronRight className="text-primary " />}
    </button>
  );
};

export default Button;
