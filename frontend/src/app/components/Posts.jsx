"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegComment, FaHeart } from "react-icons/fa";
import UserCard from "./UserCard";
import { MdDeleteOutline } from "react-icons/md";
import { timeAgo } from "@/app/components/helpers";

const Comment = ({ comment }) => (
  <div className="border-b py-2">
    <strong>{comment.username}:</strong> {comment.text}
  </div>
);

const Posts = ({ postData: { data } }) => {
  const [visiblePostIndex, setVisiblePostIndex] = useState(null);

  const toggleComments = (index) => {
    setVisiblePostIndex((prevIndex) => (prevIndex === index ? null : index));
  };
 

  if (data?.length === 0) {
    return <p>No posts found.</p>;
  }
  return (
    <div>
      {data?.map((post) => (
        <div key={post._id} className="shadow-md border rounded-lg p-3 mt-4">
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
              <FaHeart className="text-red-500 mr-1" />
              <span>{post.likes || 0}</span>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleComments(data.indexOf(post))}>
              <FaRegComment className="text-gray-500 mr-1" />
              <span>{post.comments?.length || 0} Comments</span>
            </div>
            <button className="flex items-center cursor-pointer">
              <MdDeleteOutline fontSize={20} />
            </button>
          </div>

          {visiblePostIndex === data.indexOf(post) &&
            post.comments?.length > 0 && (
              <div className="mt-4">
                {post.comments.map((comment, idx) => (
                  <Comment key={idx} comment={comment} />
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
