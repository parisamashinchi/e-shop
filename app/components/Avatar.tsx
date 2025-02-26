import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        width="40"
        height="30"
        className="rounded-full border-slate-400 border-2"
      />
    );
  }
  return <FaCircleUser size={40} />;
};

export default Avatar;
