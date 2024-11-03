import React from "react";

import Posts from "@/app/components/Posts";
import FollowingCard from "@/app/components/FollowingCard";
import UserInfo from "@/app/components/UserInfo";
const UserPage = () => {
  return (
    <>
      <div
        className=" flex flex-wrap flex-md-row w-[100%] 
       w-md-[80%] gap-2 mx-auto items-baseline justify-center">
        <div className="flex flex-col">
          <div>
            <UserInfo />
          </div>
          <div className="flex flex-col mt-5">
            <p className="text-center"> Interesting People</p>
            <FollowingCard />
          </div>
        </div>
        <div className=" flex border flex-row p-3 items-baseline">
          <div className="flex flex-col ">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
