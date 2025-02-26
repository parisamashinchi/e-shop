import { IconType } from "react-icons";

interface NavItemProps {
  label: string;
  icon: IconType;
  selected: Boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, selected }) => {
  return (
    <div
      className="flex flex-row gap-2  text-md  text-slate-700 "
       
    >
      <Icon size={20} />
      <p className=  {`${selected ? 'border-b-[1px] border-slate-700 font-semibold' : 'border-b-slate-400-1px'} w-fit `}>{label}</p>
    </div>
  );
};

export default NavItem;
