"use client";
import React, { useEffect, useState } from "react";

const ProfilePage = ({ userData }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    bio: "",
    profileImg: "",
    coverImg: "",
    link: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        fullname: userData.fullname || "",
        email: userData.email || "",
        bio: userData.bio || "",
        profileImg: userData.profileImg || "",
        coverImg: userData.coverImg || "",
        link: userData.link || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Profile Image URL:</label>
          <input
            type="text"
            name="profileImg"
            value={formData.profileImg}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your profile image URL"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Cover Image URL:</label>
          <input
            type="text"
            name="coverImg"
            value={formData.coverImg}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your cover image URL"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm">Personal Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="border rounded w-full p-1.5 text-sm"
            placeholder="Enter your personal link"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-1.5 text-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
