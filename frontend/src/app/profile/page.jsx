"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaRegImages } from "react-icons/fa";
import toast from "react-hot-toast";
import SkeletonProfile from "../components/Skeleton/profileSkeletone";

export const Profile = () => {
  const [profileImage, setProfileImage] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState({
    fullname: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    bio: "",
    link: "",
  });
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    data: user,
    isLoading,
    error: fetchError,
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
      if (!res.ok) throw new Error("Failed to fetch user information");
      const userData = await res.json();
      setUpdateData((prev) => ({
        ...prev,
        fullname: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        bio: userData.bio || "",
        link: userData.link || "",
      }));
      return userData;
    },
    staleTime: 1000 * 60 * 5,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        handleUpdateUser(reader.result, coverImg);
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
        handleUpdateUser(profileImage, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    mutate: updateUser,
    isPending,
    error: updateError,
  } = useMutation({
    mutationFn: async (updatedUser) => {
      try {
        const res = await fetch("http://localhost:8000/api/users/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedUser),
        });
        if (!res.ok) toast.error("Failed to update user");
        else toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("An error occurred during the update");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleUpdateUser = () => {
    updateUser({ ...updateData, profileImg: profileImage, coverImg });
  };
  console.log(user);

  if (isLoading) return <SkeletonProfile />;

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
              src={profileImage || user?.profileImg}
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

          {!isEditing ? (
            <>
              <h1 className="text-2xl font-semibold mt-2">{user?.fullname}</h1>
              <p className="text-gray-500">{user?.username}</p>
              <p className="text-center mt-2">
                {user?.bio || "This is my bio section"}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 btn text-white bg-gradient-to-tr from-orange-400 to-purple-400">
                Edit Profile
              </button>
            </>
          ) : (
            <div className="mt-4 flex flex-col gap-2 justify-center  space-y-4 ">
              <div>
                <input
                  type="text"
                  name="fullname"
                  value={updateData.fullname}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="border p-2 mx-2 outline-none "
                />
                <input
                  type="text"
                  name="username"
                  value={updateData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="border p-2 mx-2 outline-none "
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={updateData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="border p-2 mx-2 outline-none "
                />
              </div>
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  value={updateData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="border p-2 mx-2 outline-none "
                />
                <input
                  type="password"
                  name="newPassword"
                  value={updateData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="border p-2 mx-2 outline-none "
                />
              </div>
              <input
                type="text"
                name="link"
                value={updateData.link}
                onChange={handleInputChange}
                placeholder="Links"
                className="border p-2 mx-2 outline-none "
              />
              <textarea
                name="bio"
                value={updateData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="border p-2 mx-2 outline-none "
              />

              <button
                onClick={() => {
                  handleUpdateUser();
                  setIsEditing(false);
                }}
                className="mt-4 btn text-white bg-gradient-to-tr from-orange-400 to-purple-400">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        <div>
          {user?.posts.length === 0
            ? "User has no posts"
            : user?.posts?.map((post) => (
              // TEMPORARY CARD
                <div key={post._id} className="card bg-base-100 w-96 shadow-xl">
                  <figure>
                    <img src={post.img} alt={post._id} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{post.text}</h2>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
