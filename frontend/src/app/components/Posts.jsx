"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegComment, FaHeart } from "react-icons/fa";
import UserCard from "./UserCard";

const Posts = () => {
  const [visiblePostIndex, setVisiblePostIndex] = useState(null);

  const toggleComments = (index) => {
    setVisiblePostIndex(visiblePostIndex === index ? null : index);
  };

  const posts = [
    {
      userLogo:
        "https://img.freepik.com/free-photo/funny-man-makes-grimace-pouts-lips-has-comic-facial-expression-curly-hair-bristle_273609-18543.jpg?t=st=1730639992~exp=1730643592~hmac=73da9fc78d524d28795e8a230be69a69f6784026efed7b16a437c5a629e2ca57&w=1480",
      username: "John Doe",
      date: "Oct 31, 2023",
      photo:
        "https://img.freepik.com/free-photo/male-programmer-coding-laptop_482257-87912.jpg?t=st=1730639882~exp=1730643482~hmac=dbb44a536c9a01318f820c637b5648b87563cae0d86ae5b5d6a8b4e2d46037c6&w=1800",
      text: "Just had a great day at the park!",
      likes: 120,
      comments: 3,
      commentsData: [
        { username: "Alice", text: "Sounds fun!" },
        { username: "Bob", text: "Wish I was there!" },
        { username: "Charlie", text: "Looks beautiful!" },
      ],
    },
  ];

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white shadow-md border rounded-lg p-3 mt-4">
          <UserCard
            userLogo={post.userLogo}
            date={post.date}
            username={post.username}
            id={"efwsvsdvsdv"}
          />
          <div>
            <Image
              src={post.photo}
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
          </div>

          {visiblePostIndex === index && (
            <div className="mt-4">
              {post.commentsData.map((comment, idx) => (
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
