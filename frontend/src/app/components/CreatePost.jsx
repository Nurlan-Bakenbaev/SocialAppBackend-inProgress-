'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaImages } from 'react-icons/fa';
const CreatePost = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']);
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
    isPending: IsCreatingPost,
  } = useMutation({
    mutationFn: async ({ preview: img, text }) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/posts/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ img, text }),
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error(error);
        }
        return await res.json();
      } catch (error) {
        toast.error('Image is an invalid format or bigger than 2Mb');
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setPreview(null);
      setImg(null);
      setText('');
      toast.success('Post created successfully!');
      queryClient.invalidateQueries(['posts']);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ preview, text });
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className="border p-2 min-w-[320px] lg:w-full shadow-md">
      <form onSubmit={handleSubmit} className="rounded-md">
        <div className="relative border">
          <input
            onChange={handlePostChange}
            value={text}
            name="text"
            type="text"
            placeholder="Share something"
            className="input border-none focus:outline-none w-full"
          />
          <button
            type="submit"
            className="absolute text-white px-7 right-0 btn bg-gradient-to-tr
             from-purple-500 to-orange-500 transition-all  ease-in-out duration-700 
             hover:bg-gradient-to-tl hover:scale-105"
          >
            {IsCreatingPost ? 'Posting' : 'Post'}
          </button>
        </div>
        <label
          htmlFor="file"
          className="flex flex-row mt-2 cursor-pointer items-center gap-2 shadow-sm m-1 text-blue-500"
        >
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
