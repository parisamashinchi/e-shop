import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import { CartContextProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "e-shop",
  description: "e commerce shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: { background: "lightGreen", color: "white" },
          }}
        />
        <CartContextProvider>
          <div className="flex flex-col">
            <NavBar />
            <main className="min-h-svh">{children}</main>
            <Footer />
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
