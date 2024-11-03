"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return (
    <div className="shadow-lg  ">
      <nav className="navbar mx-auto w-[80%]">
        <div className="flex-1">
          <Link
            className="uppercase text-3xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text"
            href="/">
            Light-Up
          </Link>
        </div>
        <ul>
          <Link
            className="m-5 hover:scale-105 hover:text-blue-500"
            href={"/auth"}>
            SignUp
          </Link>
          <Link
            className="m-5  hover:scale-105 hover:text-blue-500"
            href={"/login"}>
            Login
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
