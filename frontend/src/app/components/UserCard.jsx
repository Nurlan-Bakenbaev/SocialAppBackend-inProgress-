import Link from "next/link";
import React from "react";

const UserCard = ({ userLogo, date, username, id }) => {
  return (
    <div>
      <Link href={`/userpage/${id}`}>
        <div className="flex items-center mb-2 gap-1">
          <div>
            <img
              src={userLogo}
              alt="User Logo"
              className="rounded-full w-[30px] h-[30px] object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">{username}</h4>
            <span className="text-gray-500 text-sm">{date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
