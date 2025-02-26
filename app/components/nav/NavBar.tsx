import Link from "next/link";
import { Redressed } from "next/font/google";
import Container from "../Container";
import CartCount from "./CartCount";
import { getUser } from "@/actions/getUser";
import Menu from "./Menu";
import SearchBar from "./Searchbar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const user = await getUser();

  return (
    <div className="sticky top-0 w-full z-20  shadow-sm bg-[#131921]">
      <Container>
        <div className="flex items-center justify-between gap-3 md:gap-0">
          <Link
            className={`${redressed.className} font-bold text-4xl text-white`}
            href="/"
          >
            Eshop
          </Link>
          <SearchBar />
          <div className="flex flex-row gap-8 items-center">
            <CartCount />
            {!user && (
              <Link href="/register" className="text-sm  text-white ">
                Sign up
              </Link>
            )}
            <Menu user={user} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
