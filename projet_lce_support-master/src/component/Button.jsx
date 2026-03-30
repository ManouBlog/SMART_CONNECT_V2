import React from "react";

export default function Button({
  type = "button",
  label,
  onClick,
  className = "",
  disabled = false,
  children,
}) {
  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`
        px-3 py-1 rounded-lg transition text-white
        ${disabled 
          ? "bg-gray-400 cursor-not-allowed opacity-70"
          : "bg-[#E27B1B] cursor-pointer"}
        ${className}
      `}
    >
      {label && label}
      {children}
    </button>
  );
}
