import { IconType } from "react-icons";

interface TableActionProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: IconType;
  disabled?: boolean;
}
const TableAction: React.FC<TableActionProps> = ({
  onClick,
  icon: Icon,
  disabled,
}) => {
  return (
    <button
      className={`
            rounded
            w-[40px]
            h-[30px]
            border
            border-slate-600
            bg-slate-400
             text-slate-800
            pointer-cursor
            ${disabled && "opacity-5 cursor-not-allowed"}
            `}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon size={15} />
    </button>
  );
};

export default TableAction;
