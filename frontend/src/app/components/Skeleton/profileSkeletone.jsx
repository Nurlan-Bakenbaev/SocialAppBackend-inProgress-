import React from "react";

const SkeletonProfile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="relative w-full shadow-xl rounded-lg overflow-hidden">
        {/* Banner Skeleton */}
        <div className="h-40 w-full bg-gray-300 animate-pulse" />

        <div className="p-4 flex flex-col items-center">
          {/* Profile Image Skeleton */}
          <div className="w-40 h-40 -mt-20 rounded-full ring-1 ring-slate-400 overflow-hidden bg-gray-300 animate-pulse" />

          {/* Name, Username, Bio Skeleton */}
          <div className="mt-4 w-3/4 h-6 bg-gray-300 rounded-md animate-pulse" />
          <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded-md animate-pulse" />
          <div className="mt-4 w-4/5 h-4 bg-gray-300 rounded-md animate-pulse" />

          {/* Buttons Skeleton */}
          <div className="flex mt-6 space-x-4">
            <div className="btn btn-disabled w-24 h-10 bg-gray-300 animate-pulse"></div>
            <div className="btn btn-disabled w-24 h-10 bg-gray-300 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 text-center border-t border-gray-200 mt-6">
          <div className="py-4">
            <div className="w-10 h-6 bg-gray-300 rounded-md animate-pulse mx-auto" />
            <p className="text-gray-500">Liked Posts</p>
          </div>
          <div className="py-4">
            <div className="w-10 h-6 bg-gray-300 rounded-md animate-pulse mx-auto" />
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="py-4">
            <div className="w-10 h-6 bg-gray-300 rounded-md animate-pulse mx-auto" />
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        {/* Recent Posts Skeleton */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 bg-gray-300 w-40 h-6 rounded-md animate-pulse" />
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-6 bg-gray-300 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
