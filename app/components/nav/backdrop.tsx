interface BackdropProps {
    onClick: () => void;
}
const Backdrop: React.FC<BackdropProps> = ({onClick}) => {
    return ( <div onClick={onClick} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 ">

    </div>  );
}
 
export default Backdrop;