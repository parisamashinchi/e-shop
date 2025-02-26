import { IconType } from "react-icons";

interface CategoryInputProps {
    label: string,
    icon: IconType,
    selected: boolean,
    onClick: (label:string) => void
}
const CategoryInput:React.FC<CategoryInputProps> = ({label, icon:Icon, selected, onClick}) => {
    return ( <div
         onClick={() => onClick(label)} 
         className={`flex flex-col gap-2 p-5 items-center border-2 rounded-md hover:border-slate-700 hover:text-slate-700
             ${selected ? 'border-slate-700': 'border-slate-200'} `}
    >
        <Icon />
        <p className="font-medium">{label}</p>
        
    </div> );
}
 
export default CategoryInput;