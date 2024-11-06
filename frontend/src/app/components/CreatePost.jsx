"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
const CreatePost = () => {
  const [post, setPost] = useState({
    post: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className=" border p-4 shadow-md">
      <form className="w-full   rounded-md">
        <div className="relative border">
          <input
            onChange={handlePostChange}
            value={post.post}
            name="post"
            type="text"
            placeholder="Share something "
            className=" input shadow-md  w-full focus:outline-none"
          />
          <button
            className="absolute text-white px-7 
        right-0 btn bg-gradient-to-tr from-purple-500
         to-orange-500 transition-all ease-out duration-500
          hover:bg-gradient-to-tl hover:scale-105">
            Post
          </button>
        </div>
        <label
          htmlFor="file"
          className="flex flex-row  cursor-pointer items-center gap-2 shadow-sm   m-1 text-blue-500">
          <FaImages fontSize={20} />
          <span className=" cursor-pointer hover:scale-105 ">Select Image</span>
        </label>
        <input
          accept="image/"
          id="file"
          type="file"
          name="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </form>
      <div>
        {preview && (
          <div>
            <Image
              width={150}
              height={150}
              src={preview}
              alt="Uploaded Preview"
              className="rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
