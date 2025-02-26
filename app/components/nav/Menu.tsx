"use client";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Backdrop from "./backdrop";

import { UserChangedProps } from "@/types";

interface UserProps {
  user: UserChangedProps | null;
}

const Menu = ({ user }: UserProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  function handleMenuToggle() {
    setOpenMenu((prev) => !prev);
  }

  return (
    <>
      <div
        onClick={handleMenuToggle}
        className="flex flex-row gap-2 rounded-sm p-2 cursor-pointer transition h-14 text-slate-500 hover:shadow-sm"
      >
        <AiFillCaretDown className="mt-3 text-white" />
        <Avatar src={user?.image} />
      </div>
      {openMenu && (
        <div className="absolute flex flex-col gap-5 bg-white shadow-md p-4 rounded-b-lg top-[60px] right-0 w-[250px] cursor-pointer z-50">
          <div className="flex flex-row  gap-1 justify-between">
            <div className=" h-14 align-middle w-14 mt-2"><Avatar src={user?.image} /></div>
            <div className="flex flex-col justify-center">
              <b>{user?.name}</b>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>

          {user ? (
            <>
              <hr />
              <div>
                <Link href="/orders">My Orders</Link>
              </div>
              <div>
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <hr />
              <div
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login">Login</Link>
              </div>

              <div>
                <Link href="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      )}
      {openMenu && <Backdrop onClick={handleMenuToggle} />}
    </>
  );
};

export default Menu;
