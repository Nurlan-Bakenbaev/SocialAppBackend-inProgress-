"use client";
import React, { useState } from "react";
import Link from "next/link";

const DialogWindow = ({ isOpen, onClose, users = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black opacity-60" onClick={onClose} />
      <div className="flex bg-slate-50 rounded-lg shadow-lg z-10 p-5 flex-col">
        <div>
          <input
            type="text"
            placeholder="Find user"
            className="input input-bordered focus:outline-none  mb-4 min-w-[320px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className=" text-white font-bold px-7 
        right-0 btn bg-gradient-to-tr from-purple-500
         to-orange-500 transition-all ease-out duration-500
          hover:bg-gradient-to-tl hover:scale-105">
            Post
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {users.length > 0 ? (
            users.map((user) => (
              <Link
                key={user.id}
                href={`/userpage/${user.id}`}
                onClick={onClose}>
                <div className="mt-2 flex items-center mb-2 gap-2 p-2 hover:bg-slate-200 rounded">
                  <img
                    src={user.profileImg || "/defaultProfile.png"}
                    alt="User Logo"
                    className="rounded-full w-[30px] h-[30px] object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{user.username}</h4>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogWindow;
