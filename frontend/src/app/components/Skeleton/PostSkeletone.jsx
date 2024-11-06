import React from "react";

const PostSkeleton = () => {
  return (
    <div className="card shadow-lg border border-gray-200 rounded-lg p-4 animate-pulse min-w-[280px]">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

const PostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export default PostsSkeleton;
