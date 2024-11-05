"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FaRegBell } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const NavBar = () => {
  const pathname = usePathname();
  const user = false;
  const {
    isError,
    mutate: logOutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = res.json();
      } catch (error) {
        throw new Error(error.error);
      }
    },
    onSuccess: () => {
      toast.success("Logout successfully!");
    },
  });

  if (pathname === "/login" || pathname === "/auth") {
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
          {user ? (
            <Link
              className="m-5 hover:scale-105 hover:text-blue-500"
              href={"/auth"}>
              SignUp
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault(), logOutMutation();
              }}
              className="m-5  hover:scale-105 hover:text-blue-500"
              href={"/login"}>
              Logout
            </button>
          )}
          <Link
            className="m-5  hover:scale-105 hover:text-blue-500"
            href={"/notify"}>
            <FaRegBell fontSize={18} />
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
