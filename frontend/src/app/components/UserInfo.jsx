'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaEnvelope, FaPen, FaUsers } from 'react-icons/fa';
import UserInfoSkeleton from './Skeleton/UserInfoSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import FollowingDialogCard from './FollowingDialogCard';

const UserInfo = () => {
  const { data: user, isLoading } = useQuery({ queryKey: ['authUser'] });

  if (isLoading) return <UserInfoSkeleton />;
  return (
    <div
      className="border bg-base-100 shadow-md 
    rounded-lg  w-[320px]  mx-auto relative overflow-hidden"
    >
      {user ? (
        <Image
          width={50}
          height={50}
          className=" w-full h-[85px] absolute object-cover  "
          src={user?.coverImg || '/colorful.jpeg'}
          alt="Cover-Image"
        />
      ) : (
        <div className="absolute w-full h-[80px] bg-slate-200" />
      )}
      <div className="p-2 ">
        {user ? (
          <Link
            href={'/profile'}
            className="flex  flex-col sm:flex-row items-center mb-3 text-white relative  "
          >
            <Image
              width={40}
              height={40}
              src={user?.profileImg}
              alt="User Profile"
              className="w-16 h-16 object-cover rounded-full mx-2"
            />
            <div className="text-center sm:text-left bg-slate-600 bg-opacity-50 px-4">
              <h2 className="text-lg font-semibold">{user?.fullname}</h2>
              <p className="text-sm">@{user?.username}</p>
            </div>
          </Link>
        ) : (
          <p className="relative py-8 text-center text-black z-0"> NO USER </p>
        )}

        <div className="flex flex-wrap justify-center sm:justify-start">
          <div className="flex items-center mb-1 mr-2">
            <FaPen className="text-gray-600 mr-1" />
            <span className="text-sm">{user?.followers.length} Followers </span>
          </div>
          <div className="flex items-center mb-1 mr-2">
            <span className="text-sm ">
              <FollowingDialogCard user={user} />
            </span>
          </div>
          <div className="flex items-center mb-1">
            <FaEnvelope color="red" className="text-gray-600 mr-1" />
            <span className="text-sm">{user?.email}</span>
          </div>
        </div>

        <h3 className="font-semibold mt-3 text-sm text-green-600">Bio:</h3>
        <p className="text-gray-700 text-sm">
          {user?.bio || 'No bio available'}
        </p>

        <h3 className="font-semibold text-sm mt-3 text-blue-400">Links:</h3>
        <ul className="list-disc pl-5 mb-3">
          {user?.link ? (
            <Link
              className=" text-gray-700 text-sm"
              href={user.link}
              target="_blank"
            >
              {user.link}
            </Link>
          ) : (
            <p className="w-full text-gray-700 text-sm"> No links available</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default UserInfo;
