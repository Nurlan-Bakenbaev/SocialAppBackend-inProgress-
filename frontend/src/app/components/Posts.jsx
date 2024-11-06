"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegComment, FaHeart } from "react-icons/fa";
import UserCard from "./UserCard";
import { MdDeleteOutline } from "react-icons/md";
const Posts = ({ postData }) => {
  const [visiblePostIndex, setVisiblePostIndex] = useState(null);

  const toggleComments = (index) => {
    setVisiblePostIndex(visiblePostIndex === index ? null : index);
  };
  return (
    <div>
      {postData.data.map((post, index) => (
        <div key={index} className="shadow-md border rounded-lg p-3 mt-4">
          <UserCard
            userLogo={post.user.profileImg}
            date={post.user.date}
            username={post.user.username}
            fullname={post.user.fullname}
            id={post.user._id}
          />
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          <div>
            <Image
              src={post?.photo || "/post-standart.png"}
              alt="Post"
              width={600}
              height={400}
              className="w-full rounded-lg mb-2 min-w-[150px]"
            />
            <p className="text-gray-700">{post.text}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FaHeart className="text-red-500 mr-1" />
              <span>{post.likes}</span>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleComments(index)}>
              <FaRegComment className="text-gray-500 mr-1" />
              <span>{post.comments} Comments</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <button>
                <MdDeleteOutline fontSize={20} />
              </button>
            </div>
          </div>

          {visiblePostIndex === index && (
            <div className="mt-4">
              {post?.comments?.map((comment, idx) => (
                <div key={idx} className="border-b py-2">
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
