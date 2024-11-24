'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const SearchUserWindow = ({ isOpen, onClose, users = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: foundUsers,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/users/profile/search/${searchTerm}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      return await response.json();
    },
    enabled: Boolean(searchTerm.length > 0),
  });

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
        </div>
        <div className="max-h-60 overflow-y-auto">
          {foundUsers?.data?.length > 0 ? (
            foundUsers.data.map((user) => (
              <Link
                key={user._id}
                href={`/userpage/${user._id}`}
                onClick={onClose}
              >
                <div className="mt-2 flex items-center mb-2 gap-2 p-4 hover:bg-slate-200 rounded">
                  <img
                    src={user.profileImg || '/defaultProfile.png'}
                    alt="User Logo"
                    className="rounded-full w-[35px] h-[35px] object-cover"
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

export default SearchUserWindow;
