import React from "react";
import Posts from "./Posts";
import PostsSkeleton from "./Skeleton/PostSkeletone";
import { useQuery } from "@tanstack/react-query";

const Feed = ({ feedType }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case "latest":
        return "http://localhost:8000/api/posts/all";
      case "following":
        return "http://localhost:8000/api/posts/following";
      default:
        return "http://localhost:8000/api/posts/all";
    }
  };
  const POST_ENDPOINT = getPostEndPoint();
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        throw new Error(data.error);
      }
    },
  });
  console.log(postData);
  return (
    <div>
      <h2 className="text-xl  my-4">
        {feedType === "latest" ? "Latest Posts" : "Following posts"}
      </h2>

      {!postData ? <PostsSkeleton /> : <Posts postData={postData} />}
    </div>
  );
};

export default Feed;
