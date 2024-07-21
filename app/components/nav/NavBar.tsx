import Link from "next/link";
import { Redressed } from "next/font/google";
import Container from "../Container";
import CartCount from "./CartCount";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  return (
    <div className="sticky top-0 w-full z-20 h-28 shadow-sm bg-rose-50  px-16">
      <Container>
        <div className="flex  justify-between gap-3 md:gap-0">
          <Link
            className={`${redressed.className} font-bold text-5xl text-rose-900`}
            href="/"
          >
            Eshop
          </Link>
          <div className="flex flex-row gap-8">
            <CartCount />
            <Link href="/register" className="text-sm mt-3">
              Sign up
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
