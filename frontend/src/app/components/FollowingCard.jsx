import Image from "next/image";
import React from "react";
import { FaUserPlus } from "react-icons/fa"; // Importing an icon for follow action

const FollowingCard = ({ user }) => {
  return (
    <div className="flex border flex-row gap-5 items-center w-full justify-between shadow-md rounded-lg p-4">
      <div className="flex items-center">
        <Image
          width={30}
          height={30}
          src={user?.profilePicture || "/userPlaceholder.png"}
          alt="User Logo"
          className="rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{user?.fullName || "User Name"}</h4>
          <p className="text-gray-500">@{user?.username || "username"}</p>
        </div>
      </div>
      <button
        className="flex items-center bg-blue-500 text-white rounded py-1 px-3 hover:bg-blue-700 transition-colors"
        aria-label={`Follow ${user?.fullName || "User Name"}`} // Improved accessibility
      >
        <FaUserPlus className="mr-1" /> 
        Follow
      </button>
    </div>
  );
};

export default FollowingCard;
