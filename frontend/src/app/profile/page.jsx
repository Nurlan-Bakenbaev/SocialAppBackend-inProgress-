"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaEdit, FaRegImages } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import SkeletonProfile from "../components/Skeleton/profileSkeletone";

export const Profile = () => {
  const [profileImage, setProfileImage] = useState("/user-place.png");
  const [coverImg, setCoverImg] = useState("");

  const {
    data: user,
    isLoading,
    error: updateError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/auth/getme", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user information");
      }
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        handleUpdateUser(profileImage, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImg(reader.result);
        handleUpdateUser(coverImg, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (updatedImages) => {
      try {
        const res = await fetch("http://localhost:8000/api/users/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedImages),
        });
        if (!res.ok) {
          toast.error("Failed to update user");
        } else {
          toast.success("Profile updated successfully!");
        }
      } catch (error) {
        toast.error("An error occurred during the update");
      }
    },
  });

  const handleUpdateUser = (newProfileImage, newBannerImage) => {
    updateUser({
      profileImg: newProfileImage,
      coverImg: newBannerImage,
    });
  };
  if (isLoading) {
    return <SkeletonProfile />;
  }
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="relative w-full shadow-xl rounded-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-tr from-orange-400 to-purple-400 relative">
          <img
            src={coverImg || user?.coverImg || "/banner-placeholder.png"}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="banner-input"
            className="absolute top-2 right-4 p-2 bg-white rounded-full shadow-lg cursor-pointer">
            <FaRegImages fontSize={20} className="text-blue-500" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="hidden"
            id="banner-input"
          />
        </div>

        <div className="p-4 flex flex-col items-center">
          <div className="w-40 h-40 -mt-20 rounded-full ring-1 ring-slate-400 overflow-hidden relative">
            <img
              src={user?.profileImg}
              alt="Profile"
              className="w-full h-full object-cover bg-white"
            />
            <label
              htmlFor="profile-input"
              className="absolute bottom-2 right-8 p-2 bg-white rounded-full shadow-lg cursor-pointer">
              <FaRegImages fontSize={20} className="text-blue-500" />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-input"
            />
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
