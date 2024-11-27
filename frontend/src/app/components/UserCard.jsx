import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserCard = ({ userLogo, date, username, id, fullname }) => {
  if (!username || !id) {
    return null;
  }
  return (
    <div>
      <Link href={`/userpage/${id}`}>
        <div className="flex items-center mb-2 gap-1 hover:bg-purple-100 p-2">
          <div>
            <Image
              height={40}
              width={40}
              src={userLogo || '/userPlaceholder.png'}
              alt="User Logo"
              className="rounded-full w-[35px] h-[35px] object-cover"
            />
          </div>
          <div>
            <div>
              <p className="font-bold"> @{username}</p>
              <p className="text-gray-400"> {fullname}</p>
            </div>
            <span className="text-gray-500 text-sm">{date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
