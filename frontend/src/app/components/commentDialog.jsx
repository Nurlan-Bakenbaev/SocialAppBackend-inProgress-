import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

const CommentDialog = ({ onClose, postId, postComments }) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const {
    mutate: handleComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (comment) => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/posts/comment/${postId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: comment }),
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to create comment");
        }
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Comment posted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setComment("");
    },
  });
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    handleComment(comment);
  };
  const {
    mutate: deleteComment,
    isPending: isDeleting,
    error: commentDeletingError,
  } = useMutation({
    mutationFn: async ({ postId, commentId }) => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/posts/comment/${postId}/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to delete comment");
        }
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="modal modal-open">
      <div className="absolute modal-box h-[480px]">
        <button
          className="absolute right-2 top-2 text-gray-400
           hover:text-gray-600"
          onClick={onClose}>
          <AiOutlineClose className="text-xl" />
        </button>
        <h3 className="text-lg font-bold mb-4">Comments</h3>
        <div className="overflow-y-auto max-h-[340px] p-2">
          {postComments?.map(({ _id, text, user }) => (
            <div key={_id} className="border-b border-gray-200 py-2">
              <div className="flex flex-row gap-2">
                <Image
                  width={30}
                  height={30}
                  src={user?.profileImg || "/userPlaceholder.png"}
                  alt="user-image"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-400">username: @{user._id}</p>
                </div>
              </div>
              <div className="flex  justify-between items-center">
                <p className="mt-1 text-gray-700">{text}</p>
                <button
                  className="text-red-500"
                  onClick={() =>
                    deleteComment({ postId: postId, commentId: _id })
                  }>
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 ">
          <input
            value={comment}
            onChange={handleCommentChange}
            placeholder="Leave a comment"
            className="input input-bordered input-primary w-full focus:outline-none"
            type="text"
          />
          <button
            onClick={() => handleSubmit(postId)}
            className="btn text-white bg-gradient-to-tr from-purple-500 to-orange-500">
            Comment
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default CommentDialog;
