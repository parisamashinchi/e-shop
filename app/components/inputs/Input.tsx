import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        className={`
        peer
        w-full
        p-4
        pt-6
        outline-none
        font-light
        bg-white
        rounded-md
        transition
        border-2
        disabled:opacity-10
        disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-400" : "border-slate-400"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-400"}
     `}
      />
      <label
        htmlFor={id}
        className={`
        cursor-text
        text-md
        absolute
        top-5
        left-4
        z-10
        transform
        -translate-y-3
        origin-[0]
        duration-150
        peer-placeholder-shown: scale-100
        peer-placeholder-shown: translate-y-0 
        peer-focus: scale-75
        peer-focus: -translate-y-4
         ${errors[id] ? "text-rose-400" : "text-slate-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
