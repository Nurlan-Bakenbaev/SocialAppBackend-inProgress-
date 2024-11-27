import React from 'react';
import { timeAgo } from './helpers';
import Link from 'next/link';
import Image from 'next/image';

const NotificationCard = ({ data }) => {
  return (
    <div>
      <Link href={`/userpage/${data.from._id}`} className="font-semibold">
        <div className="card bg-base-100 shadow-xl p-4 mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4">
              <Image
              height={40}
              width={40}
                src={data?.from?.profileImg || '/default-profile.jpg'}
                alt="Sender"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p> {data.from.username}</p>

              <span className="text-sm text-gray-500">
                {data.type === 'like' &&
                  ` @${data.from.username} liked your post`}
              </span>
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            <span>{timeAgo(data.createdAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotificationCard;
