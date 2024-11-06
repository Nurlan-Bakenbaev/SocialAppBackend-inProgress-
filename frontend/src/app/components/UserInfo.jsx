"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEnvelope, FaPen, FaUsers } from "react-icons/fa";
import UserInfoSkeleton from "./Skeleton/UserInfoSkeleton";
import Link from "next/link";
import Image from "next/image";

const UserInfo = () => {
  const { data: user, isLoading } = useQuery({ queryKey: ["authUser"] });
  console.log(user);
  if (isLoading) return <UserInfoSkeleton />;
  return (
    <div className="border bg-base-100 shadow-md rounded-lg p-4 w-full sm:max-w-[320px] lg:max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-3">
        <Image
          width={40}
          height={40}
          src={user?.profileImg || "/userPlaceholder.png"}
          alt="User Profile"
          className="w-16 h-16 rounded-full border border-gray-300  mx-2"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">{user?.fullname}</h2>
          <p className="text-gray-500 text-sm">@{user?.username}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start">
        <div className="flex items-center mb-1 mr-2">
          <FaPen className="text-gray-600 mr-1" />
          <span className="text-sm">{user?.posts || 0} Posts</span>
        </div>
        <div className="flex items-center mb-1 mr-2">
          <FaUsers className="text-gray-600 mr-1" />
          <span className="text-sm">{user?.followers || 0} Followers</span>
        </div>
        <div className="flex items-center mb-1">
          <FaEnvelope className="text-gray-600 mr-1" />
          <span className="text-sm">{user?.email}</span>
        </div>
      </div>

      <h3 className="font-semibold mt-3 text-sm">Bio:</h3>
      <p className="text-gray-700 text-sm">{user?.bio || "No bio available"}</p>

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
  );
};
export default UserInfo;
