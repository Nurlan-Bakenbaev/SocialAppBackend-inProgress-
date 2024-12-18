'use client';
import React, { useState } from 'react';
import {
  FaHome,
  FaSearch,
  FaPlusCircle,
  FaHeart,
  FaUser,
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import SearchUserWindow from './SearchUserWindow';

const Menu = () => {
  const pathName = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (pathName === '/auth' || pathName === '/login') {
    return null;
  }
  return (
    <footer className="bg-white shadow-md fixed bottom-0 left-0 right-0">
      <div className="flex justify-around items-center p-4">
        <Link
          href="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <button
          className="flex flex-col items-center font-bold text-gray-600 hover:text-blue-500"
          onClick={() => setIsDialogOpen(true)}
        >
          <FaSearch size={24} />
          <span className="text-xs">Search</span>
        </button>

        <SearchUserWindow
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />

        <Link
          href="/likedposts"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <FaHeart size={24} />
          <span className="text-xs">Likes</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <FaUser size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </footer>
  );
};

export default Menu;
