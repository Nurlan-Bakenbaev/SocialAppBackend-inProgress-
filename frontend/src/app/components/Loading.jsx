import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <span className="bg-purple-600 scale-150 loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
