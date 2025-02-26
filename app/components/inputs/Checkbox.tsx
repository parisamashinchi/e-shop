import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  id: string;
  label: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
}
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className=" flex flex-row gap-2 w-full items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"

      />
      <label htmlFor="id">{label}</label>
    </div>
  );
};

export default Checkbox;
