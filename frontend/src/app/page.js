"use client";
import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import FollowingCard from "./components/FollowingCard";
import UserInfo from "./components/UserInfo";
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
    staleTime: 1000 * 60 * 100,
  });
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [authUser, loading, router]);
  return (
    <div
      className="px-2 flex 
    flex-row 
    w-full gap-2 mx-auto
     justify-center">
      <div className=" hidden md:flex flex-col gap-4 ">
        <UserInfo />
        <div >
          <FollowingCard />
        </div>
      </div>

      <div className="flex flex-col">
        <CreatePost />
        <div className="flex mt-4 items-center gap-4 justify-between">
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
