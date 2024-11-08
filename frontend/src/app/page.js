"use client";
import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import FollowingCard from "./components/FollowingCard";
import UserInfo from "./components/UserInfo";
import Loading from "./components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Feed from "./components/Feed";
const Home = () => {
  const [feedType, setFeedType] = useState("latest");
  const router = useRouter();
  const {
    data: authUser,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/getme", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user information");
        }
        return await res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [authUser, loading, router]);
  return (
    <div className="flex flex-wrap md:flex-row sm:w-full md:w-[80%] gap-3 mx-auto justify-center">
      <div className="flex gap-3 flex-col">
        <UserInfo />
        <div className="flex flex-col mt-5">
          <p className="text-center">Interesting People:</p>
          <FollowingCard />
        </div>
      </div>
      {loading && <Loading />}
      <div className="flex flex-col min-w-[320px]">
        <CreatePost />
        <div className="flex items-center mt-2 justify-between p-4 ">
          <p onClick={() => setFeedType("latest")} className="btn">
            Latest Posts
          </p>
          <p onClick={() => setFeedType("following")} className="btn">
            Following posts
          </p>
        </div>
        <Feed feedType={feedType} />
      </div>
    </div>
  );
};

export default Home;
