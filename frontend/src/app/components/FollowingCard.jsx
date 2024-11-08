import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import FollowindSkeletone from "./Skeleton/FollowindSkeletone";

const FollowingCard = ({ user }) => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);

  const {
    data: suggestedUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/suggested", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        return await res.json();
      } catch (error) {
        throw new Error(error || "Failed to fetch");
      }
    },
  });
  if (suggestedUsers?.data?.length === 0) {
    return <p className="text-center">No suggested users to follow</p>;
  }

  return (
    <div className="flex border flex-row gap-5 items-center w-full justify-between shadow-md rounded-lg p-4">
      <div>
        <p className="text-center">Interesting People:</p>
        {isLoading && (
          <div className=" flex flex-col gap-3">
            <FollowindSkeletone />
            <FollowindSkeletone />
            <FollowindSkeletone />
          </div>
        )}
        {suggestedUsers?.data.map((user) => (
          <div
            className="min-w-[280px]  flex flex-row hover:bg-slate-100 items-center gap-3 border-b p-3"
            key={user._id}>
            <div>
              <Image
                width={30}
                height={30}
                src={user?.profilePicture || "/userPlaceholder.png"}
                alt="User Logo"
                className="rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold">
                  {user?.fullname || "Default Name"}
                </h4>
                <p className="text-gray-500">
                  @{user?.username || "default username"}
                </p>
              </div>
            </div>
            <button
              className="flex items-center bg-gradient-to-r from-purple-400 to-orange-400 text-white rounded py-1 px-3 hover:bg-blue-700 transition-colors"
              aria-label={`Follow ${user?.fullName || "User Name"}`}>
              <FaUserPlus className="mr-1" />
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FollowingCard;
