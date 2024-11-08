"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegComment, FaHeart } from "react-icons/fa";
import UserCard from "./UserCard";
import { MdDeleteOutline } from "react-icons/md";
import { timeAgo } from "@/app/components/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import Loading from "./Loading";
const Posts = ({ postData: { data } }) => {
  const [visiblePostIndex, setVisiblePostIndex] = useState(null);
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);

  const toggleComments = (index) => {
    setVisiblePostIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async (postId) => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/posts/delete/${postId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error(data.error);
        }
        const data = await res.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
    },
  });
  const handleDeletePost = (postId) => {
    deletePost(postId);
  };
  if (data?.length === 0) {
    return <p>No posts found.</p>;
  }
  return (
    <div>
      {isPending && <Loading />}
      {data?.map((post) => (
        <div
          key={post._id}
          className="shadow-md border 
        rounded-lg p-3 mt-4">
          <UserCard
            userLogo={post.user.profileImg}
            date={post.user.date}
            username={post.user.username}
            fullname={post.user.fullname}
            id={post.user._id}
          />
          <p className="text-gray-400 text-sm">
            Created: {timeAgo(post.createdAt)}
          </p>
          <div>
            {post.img && (
              <Image
                src={post?.img}
                alt="Post"
                width={600}
                height={400}
                className="w-full rounded-lg mb-2 min-w-[150px]"
                placeholder="blur"
                blurDataURL="/post-standart.png"
              />
            )}
            <p className="text-gray-700">{post.text}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FaHeart className="text-red-200 mr-1" />
              <span>{post.likes || ""}</span>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleComments(data.indexOf(post))}>
              <FaRegComment className="text-gray-500 mr-1" />
              <span>{post.comments?.length || 0} Comments</span>
            </div>
            {post?.user?._id === authUser?._id && (
              <>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="flex btn items-center cursor-pointer">
                  <MdDeleteOutline color="red" fontSize={20} />
                </button>
                <button className="btn">
                  <CiEdit fontSize={20} />
                </button>
              </>
            )}
          </div>
          {visiblePostIndex === data.indexOf(post) &&
            post.comments?.length > 0 && (
              <div className="mt-4">
                {post.comments.map((comment, _id) => (
                  <div key={_id} className="border-b py-2">
                    <strong>{comment.username}:</strong> {comment.text}
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
