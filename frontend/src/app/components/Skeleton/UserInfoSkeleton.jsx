import React from "react";

const UserInfoSkeleton = () => {
  return (
    <div className="border bg-base-100 shadow-md rounded-lg p-4 w-full sm:max-w-lg lg:max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center mb-3">
        <div className="skeleton h-16 w-16 rounded-full mb-2 sm:mb-0 sm:mr-3"></div>
        <div className="text-center sm:text-left">
          <div className="skeleton h-4 w-24 mb-2"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start">
        <div className="flex items-center mb-1 mr-2">
          <div className="skeleton h-4 w-16"></div>
        </div>
        <div className="flex items-center mb-1 mr-2">
          <div className="skeleton h-4 w-24"></div>
        </div>
        <div className="flex items-center mb-1">
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>

      <h3 className="font-semibold mt-3 text-sm">Bio:</h3>
      <div className="skeleton h-4 w-full mb-2"></div>

      <h3 className="font-semibold text-sm mt-3">Links:</h3>
      <ul className="list-disc pl-5 mb-3">
        <li className="skeleton h-4 w-40 mb-2"></li>
        <li className="skeleton h-4 w-40 mb-2"></li>
        <li className="skeleton h-4 w-40 mb-2"></li>
      </ul>
    </div>
  );
};

export default UserInfoSkeleton;
