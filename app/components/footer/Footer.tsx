import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTelegram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-rose-900 text-gray-50 ">
      <Container>
        <div className="flex justify-between gap-15  ">
          <FooterList>
            <h1 className="font-bold"> Categories</h1>
            <ul>
              <li>
                <Link href="#">Laptops</Link>
              </li>
              <li>
                <Link href="#">Mobile</Link>
              </li>
              <li>
                <Link href="#">Accessories</Link>
              </li>
            </ul>
          </FooterList>
          <FooterList>
            <h1 className="font-bold">Services</h1>
            <ul>
              <li>
                <Link href="#">contact us</Link>
              </li>
              <li>
                <Link href="#">about</Link>
              </li>
              <li>
                <Link href="/register">Sign up</Link>
              </li>
            </ul>
          </FooterList>
          <div className="w-full">
            <h1 className="font-bold">About us</h1>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>&copy;{new Date().getFullYear()} e-shop. All rights reserved.</p>
          </div>
          <FooterList>
            <h1 className="font-bold">Follow us</h1>
            <div className="flex flex-row gap-2 mt-2">
              <Link href="#">
                <FaFacebook />
              </Link>
              <Link href="#">
                <FaInstagramSquare />
              </Link>
              <Link href="#">
                <FaTelegram />
              </Link>
              <Link href="#">
                <FaLinkedin />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
