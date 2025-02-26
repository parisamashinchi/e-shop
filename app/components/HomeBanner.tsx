import Image from "next/image";
import Container from "./Container";
const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-tl from-orange-400 to-teal-500 w-full flex px-32 ">
      <div className="flex flex-col justify-center w-2/3">
        <h1 className="text-4xl text-white font-bold mb-2">Season Sale</h1>
        <p className="text-xl text-white">Best Sale ever. Enjoy discount. </p>
        <p className="text-4xl text-yellow-200 font-bold mt-5"> Get 40% off</p>
      </div>
      <div className="w-1/3 relative">
        <Image src="/banner.jpg" width="300" height="300" alt="banner" />
      </div>
    </div>
  );
};

export default HomeBanner;
