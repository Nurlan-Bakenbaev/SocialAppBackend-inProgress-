"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaImages } from "react-icons/fa";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePostChange = (e) => {
    setText(e.target.value);
  };

  const {
    mutate: createPost,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: async ({ img, text }) => {
      try {
        const res = await fetch("http://localhost:8000/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ img, text }),
          credentials: "include",
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData.error);
          throw new Error(errorData.error);
        }
        return await res.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setImg(null);
      setText("");
      toast.success("Post created successfully!");
      queryClient.invalidateQueries(["posts"]);
    },
    onError: () => {
      toast.error(error?.error || "Failed to create post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ img, text });
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className="border p-4 shadow-md">
      <form onSubmit={handleSubmit} className="w-full rounded-md">
        <div className="relative border">
          <input
            onChange={handlePostChange}
            value={text}
            name="text"
            type="text"
            placeholder="Share something"
            className="input shadow-md w-full focus:outline-none"
          />
          <button
            type="submit"
            className="absolute text-white px-7 right-0 btn bg-gradient-to-tr
             from-purple-500 to-orange-500 transition-all ease-out duration-500 
             hover:bg-gradient-to-tl hover:scale-105">
            {isLoading ? "Posting" : "Post"}
          </button>
        </div>
        <label
          htmlFor="file"
          className="flex flex-row mt-2 cursor-pointer items-center gap-2 shadow-sm m-1 text-blue-500">
          <FaImages fontSize={20} />
          <span className="cursor-pointer hover:scale-105">Select Image</span>
        </label>
        <input
          accept="image/*"
          id="file"
          type="file"
          name="img"
          className="hidden"
          onChange={handleFileChange}
        />
      </form>
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
  );
};

export default CreatePost;
