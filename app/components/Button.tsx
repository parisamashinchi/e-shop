"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      ${disabled && "opacity-40"}
       ${disabled && "cursor-not-allowed"}
        rounded-md
        hover: opacity-75
        transition
        border-slate-700 
        flex 
        item-center
        justify-center 
        gap-2
        ${
          outline
            ? " text-slate-700 border-2 border-slate-500 "
            : "bg-slate-700 text-white"
        }
        ${
          small
            ? "text-sm py-1 px-2 font-light"
            : "text-md py-3 px-4 font-semibold"
        }
        ${custom ? custom : ""}
        `}
    >
      {Icon && <Icon size={22} />}
      {label}
    </button>
  );
};

export default Button;
