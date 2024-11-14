"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Posts from "../components/Posts";

const LikedPosts = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const {
    data: likedPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likedPosts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/posts/likedposts/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch liked posts");
        }
        return await res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  console.log(likedPosts);
  return (
    <div className="w-full flex flex-row border justify-between">
     <div className="w-[280px]"> {likedPosts && <Posts postData={likedPosts} />}</div>
    </div>
  );
};

export default LikedPosts;
