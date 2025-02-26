"use client";
import Link from "next/link";
import NavItem from "./navItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-4 pt-16 h-lvh pl-[30px] w-[300px] shadow-md border-l-slate-700-1">
      <Link href="/dashboard">
        <NavItem
          label="Summary"
          icon={MdDashboard}
          selected={pathName === "/dashboard"}
        />
      </Link>
      <Link href="/dashboard/add">
        <NavItem
          label="Add product"
          icon={MdLibraryAdd}
          selected={pathName === "/dashboard/add"}
        />
      </Link>
      <Link href="/dashboard/products">
        <NavItem
          label="Products"
          icon={MdDns}
          selected={pathName === "/dashboard/products"}
        />
      </Link>
      <Link href="/dashboard/orders">
        <NavItem
          label="Orders"
          icon={MdFormatListBulleted}
          selected={pathName === "/dashboard/orders"}
        />
      </Link>
    </div>
  );
};

export default DashboardNav;
