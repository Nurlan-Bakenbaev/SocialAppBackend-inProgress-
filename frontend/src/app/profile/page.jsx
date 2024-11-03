"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
    // Set formData with the user's existing data when the component mounts
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
    // Here you would typically send the updated formData to your API
    console.log("Profile updated:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="mb-4">
          <label className="block mb-1">Profile Image URL:</label>
          <input
            type="text"
            name="profileImg"
            value={formData.profileImg}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your profile image URL"
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block mb-1">Cover Image URL:</label>
          <input
            type="text"
            name="coverImg"
            value={formData.coverImg}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your cover image URL"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your username"
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your password"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block mb-1">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Link */}
        <div className="mb-4">
          <label className="block mb-1">Personal Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Enter your personal link"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
