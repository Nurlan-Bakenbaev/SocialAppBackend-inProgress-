"use client";
import React, { useState } from "react";
import { FaEnvelope, FaPen, FaLink, FaUsers } from "react-icons/fa";

const UserInfo = () => {
  const [user, setUser] = useState({
    profilePicture: "https://via.placeholder.com/100",
    fullName: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    links: ["https://example.com", "https://portfolio.com"],
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);
  const [newLinks, setNewLinks] = useState(user.links.join(", "));

  const handleBioChange = () => {
    setUser((prevUser) => ({ ...prevUser, bio: newBio }));
    setIsEditingBio(false);
  };

  const handleLinksChange = () => {
    setUser((prevUser) => ({
      ...prevUser,
      links: newLinks.split(", ").map((link) => link.trim()),
    }));
    setIsEditingLinks(false);
  };

  return (
    <div className="border bg-base-100 shadow-md rounded-lg p-4 max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
      <div className="flex flex-col sm:flex-row items-center mb-3">
        <img
          src={user.profilePicture}
          alt="User Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2 sm:mb-0 sm:mr-3"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">{user.fullName}</h2>
          <p className="text-gray-500 text-sm">@{user.username}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start">
        <div className="flex items-center mb-1 mr-2">
          <FaPen className="text-gray-600 mr-1" />
          <span className="text-sm">{user.posts || 0} Posts</span>
        </div>
        <div className="flex items-center mb-1 mr-2">
          <FaUsers className="text-gray-600 mr-1" />
          <span className="text-sm">{user.followers || 0} Followers</span>
        </div>
        <div className="flex items-center mb-1">
          <FaEnvelope className="text-gray-600 mr-1" />
          <span className="text-sm">{user.email}</span>
        </div>
      </div>

      <h3 className="font-semibold mt-3 text-sm">Bio:</h3>
      {isEditingBio ? (
        <div className="flex flex-col sm:flex-row mb-3">
          <input
            type="text"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="input input-bordered w-full sm:w-auto sm:flex-1"
          />
          <button
            onClick={handleBioChange}
            className="btn btn-primary btn-sm mt-2 sm:mt-0 sm:ml-2">
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row mb-3 items-center">
          <p className="text-gray-700 text-sm text-center sm:text-left">
            {user.bio}
          </p>
          <button
            onClick={() => setIsEditingBio(true)}
            className="btn btn-link text-sm mt-2 sm:mt-0 sm:ml-2">
            Edit
          </button>
        </div>
      )}

      <h3 className="font-semibold text-sm">Links:</h3>
      {isEditingLinks ? (
        <div className="flex flex-col sm:flex-row mb-3">
          <input
            type="text"
            value={newLinks}
            onChange={(e) => setNewLinks(e.target.value)}
            className="input input-bordered w-full sm:w-auto sm:flex-1"
          />
          <button
            onClick={handleLinksChange}
            className="btn btn-primary btn-sm mt-2 sm:mt-0 sm:ml-2">
            Save
          </button>
        </div>
      ) : (
        <ul className="list-disc pl-5 mb-3">
          {user.links.map((link, index) => (
            <li key={index} className="text-blue-500 text-sm hover:underline">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
          <button
            onClick={() => setIsEditingLinks(true)}
            className="btn btn-link text-sm mt-2 sm:mt-0">
            Edit Links
          </button>
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
