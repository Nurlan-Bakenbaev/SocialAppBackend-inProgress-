import React from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import FollowingCard from "./components/FollowingCard";
import UserInfo from "./components/UserInfo";
import Loading from "./components/Loading";
const Home = () => {
  const loading = false;
  return (
    <div
      className=" flex flex-wrap flex-md-row w-sm-[100%] 
       w-md-[80%] gap-3 mx-auto  justify-center">
      {loading && <Loading />}
      <div className="flex  gap-3 flex-col">
        <UserInfo />

        <div className="flex flex-col mt-5">
          <p className="text-center"> Interesting People:</p>
          <FollowingCard />
        </div>
      </div>
      <div className="flex flex-col ">
        <CreatePost />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
