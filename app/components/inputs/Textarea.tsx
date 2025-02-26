import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface TextareaProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        required={required}
        disabled={disabled}
        {...register(id)}
        className={`
        peer
        w-full
        px-4
        max-h-[150px]
        min-h-[150px]
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
        top-2
        left-4
        z-10
        transform
        -translate-y-3
        origin-[0]
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

export default Textarea;
