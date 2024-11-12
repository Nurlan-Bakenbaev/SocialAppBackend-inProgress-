"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa"; // Import the Edit icon from react-icons

export const Profile = () => {
  const { data: user, isLoading } = useQuery({ queryKey: ["authUser"] });
  const [profileImage, setProfileImage] = useState("/user-place.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full shadow-xl rounded-lg overflow-hidden">
        <div className="h-40 bg-gradient-to-tr from-orange-400 to-purple-400"></div>

        <div className="p-4 flex flex-col items-center">
          <div
            className=" w-40 h-40 -mt-20 rounded-full
           ring-1 ring-slate-400 overflow-hidden relative">
            <img
              src={profileImage}
              alt="Profile Picture"
              className="w-full bg-white"
            />
            <label className="relative z-40" htmlFor="file-input">
              <FaEdit fontSize={50} /> gsdfvsfgsfafasfasf
            </label>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-input"
              />
            </div>
            <label
              htmlFor="file-input"
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
              <FaEdit className="text-gray-600" />
            </label>
          </div>
          <h1 className="text-2xl font-semibold mt-2">{user?.fullname}</h1>
          <p className="text-gray-500">{user?.username}</p>
          <p className="text-center mt-2">
            {user?.bio || "This is my bio section"}
          </p>
          <div className="flex mt-4 space-x-4">
            {!user?._id && (
              <button className="btn text-white bg-gradient-to-tr from-orange-400 to-purple-400">
                Follow
              </button>
            )}
            <button className="btn btn-outline">Message</button>
          </div>
        </div>

        <div className="grid grid-cols-3 text-center border-t border-gray-200">
          <div className="py-4">
            <span className="font-semibold">{user?.likedPosts?.length}</span>
            <p className="text-gray-500">Liked Posts</p>
          </div>
          <div className="py-4">
            <span className="font-semibold">{user?.followers?.length}</span>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="py-4">
            <span className="font-semibold">{user?.following?.length}</span>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
