"use client";
import React, { useState } from "react";

const CreatePost = () => {
  const [post, setPost] = useState({
    post: "",
  });
  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div className=" border p-4 shadow-md">
      <form className="w-full relative border rounded-md">
        <input
          onChange={handlePostChange}
          value={post.post}
          name="post"
          type="text"
          placeholder="Share something "
          className=" input  w-full focus:outline-none"
        />
        <button
          className="absolute text-white px-7 
        right-0 btn bg-gradient-to-tr from-purple-500
         to-orange-500 transition-all ease-out duration-500
          hover:bg-gradient-to-tl hover:scale-105">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
