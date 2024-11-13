"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEnvelope, FaPen, FaUsers } from "react-icons/fa";
import UserInfoSkeleton from "./Skeleton/UserInfoSkeleton";
import Link from "next/link";
import Image from "next/image";

const UserInfo = () => {
  const { data: user, isLoading } = useQuery({ queryKey: ["authUser"] });

  if (isLoading) return <UserInfoSkeleton />;
  return (
    <div
      className="border bg-base-100 shadow-md 
    rounded-lg  w-full min-w-[280px] lg:max-w-xl mx-auto relative overflow-hidden">
      <img
        className="h-[80px] w-full opacity-85 absolute object-cover  "
        src={user.coverImg}
        alt="Cover-Image"
      />
      <div className="p-2">
        <div className="flex  flex-col sm:flex-row items-center mb-3 text-orange-300 relative z-20 ">
          <Image
            width={40}
            height={40}
            src={user?.profileImg || "/userPlaceholder.png"}
            alt="User Profile"
            className="w-16 h-16 rounded-full mx-2"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold">{user?.fullname}</h2>
            <p className="text-sm">@{user?.username}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start">
          <div className="flex items-center mb-1 mr-2">
            <FaPen className="text-gray-600 mr-1" />
            <span className="text-sm">{user?.followers.length} Followers </span>
          </div>
          <div className="flex items-center mb-1 mr-2">
            <FaUsers color="blue" className=" mr-1" />
            <span className="text-sm ">
              {user?.following.length || 0} Following
            </span>
          </div>
          <div className="flex items-center mb-1">
            <FaEnvelope color="red" className="text-gray-600 mr-1" />
            <span className="text-sm">{user?.email}</span>
          </div>
        </div>

        <h3 className="font-semibold mt-3 text-sm">Bio:</h3>
        <p className="text-gray-700 text-sm">
          {user?.bio || "No bio available"}
        </p>

        <h3 className="font-semibold text-sm mt-3">Links:</h3>
        <ul className="list-disc pl-5 mb-3">
          {user?.links ? (
            user?.links?.map((link, index) => (
              <li key={index} className="text-blue-500 text-sm hover:underline">
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </Link>
              </li>
            ))
          ) : (
            <p className="w-full text-gray-700 text-sm"> No links available</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default UserInfo;
