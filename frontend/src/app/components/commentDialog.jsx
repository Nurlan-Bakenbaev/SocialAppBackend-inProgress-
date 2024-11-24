import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { timeAgo } from './helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const CommentDialog = ({ data }) => {
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const {
    mutate: handleComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/posts/comment/${data._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: comment }),
          credentials: 'include',
        }
      );
      const commentData = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return commentData;
    },
    onSuccess: (data) => {
      toast.success('Comment posted successfully');
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          document.getElementById('comment_modal' + data._id).showModal()
        }
      >
        <FaRegCommentDots fontSize={16} /> {data.comments.length} Comments
      </button>
      <dialog id={`comment_modal${data._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-semibold text-lg">Latest comments</h3>
          <div className="h-[260px] overflow-y-auto ">
            {data.comments.length === 0 ? (
              <span className="text-center"> No comments yet</span>
            ) : (
              data.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b py-2 px-4 even:bg-gray-100 hover:bg-purple-100 "
                >
                  <Link
                    href={`/userpage/${comment.user._id}`}
                    className="flex flex-row items-center gap-2 "
                  >
                    <img
                      src={comment.user.profileImg}
                      alt={'photo of' + comment.user.username}
                      className="w-[45px] h-[45px]  object-cover rounded-full"
                    />
                    <p>{comment.user.username}</p>
                  </Link>
                  <p>{comment.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="modal-action flex flex-col">
            <div className="flex flex-row gap-2 pt-4 border-t">
              <input
                onChange={handleChangeComment}
                type="text"
                value={comment}
                placeholder="Leave a comment..."
                className="input input-bordered focus:outline-none w-full max-w-xs"
              />
              <button
                onClick={handleComment}
                className="btn text-white bg-gradient-to-tr
             from-purple-500 to-orange-500"
              >
                Comment
              </button>
            </div>
            <p className="text-slate-400 text-xs py-1">
              Press ESC key or click the button below to close
            </p>

            <button
              className="btn "
              onClick={() =>
                document.getElementById('comment_modal' + data._id).close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default CommentDialog;
