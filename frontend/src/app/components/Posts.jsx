'use client';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import UserCard from './UserCard';
import { MdDeleteOutline } from 'react-icons/md';
import { timeAgo } from '@/app/components/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from './Loading';
import CommentDialog from './CommentDialog';
const Posts = ({ postData }) => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']);

  const {
    mutate: likeUnLike,
    isPending: isLiking,
    error,
  } = useMutation({
    mutationFn: async (postId) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/posts/like/${postId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error(data.error);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.error);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleLikedPost = (postId) => {
    likeUnLike(postId);
  };

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async (postId) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/posts/delete/${postId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error(data.error);
        }
        await res.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
  });
  const handleDeletePost = (postId) => {
    deletePost(postId);
  };
  if (!postData) {
    return <p>No posts found.</p>;
  }
  return (
    <div>
      {isPending && <Loading />}
      {postData?.map((post) => (
        <div
          key={post._id}
          className="shadow-md border 
        rounded-lg p-3 mt-4"
        >
          <UserCard
            userLogo={post?.user?.profileImg || null}
            date={post?.user?.date}
            username={post?.user?.username}
            fullname={post?.user?.fullname}
            id={post.user?._id}
          />

          <p className="text-gray-400 text-right text-sm">
            Posted: {timeAgo(post.createdAt)}
          </p>
          <div>
            <p className="text-gray-700">{post.text}</p>

            {post?.img && (
              <Image
                src={post?.img || null}
                alt="Post-Img"
                width={600}
                height={400}
                className="w-full rounded-lg mb-2 min-w-[250px]"
                placeholder="blur"
                blurDataURL="/post-standart.png"
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.preventDefault(), handleLikedPost(post._id);
                }}
              >
                <FaHeart
                  className={`${
                    authUser?.likedPosts.includes(post._id)
                      ? 'text-red-500'
                      : 'text-red-200'
                  }  mr-1`}
                />
              </button>
              <span>{post.likes.length} likes</span>
            </div>
            <CommentDialog data={post} />
            {post?.user?._id === authUser?._id && (
              <>
                <div className="text-center">
                  <button
                    className="btn"
                    onClick={() =>
                      document
                        .getElementById('delete_modal_2' + post._id)
                        .showModal()
                    }
                  >
                    <MdDeleteOutline color="red" fontSize={20} />{' '}
                  </button>
                  <dialog id={`delete_modal_2${post._id}`} className="modal">
                    <div className="modal-box">
                      <p className="font-bold text-lg">
                        Do you want to delete post ?
                      </p>
                      <div className="flex flex-row gap-4 py-4 px-2 justify-center">
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="flex btn bg-red-500 hover:bg-red-400 text-white items-center cursor-pointer"
                        >
                          <MdDeleteOutline
                            className="text-white"
                            fontSize={20}
                          />
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`delete_modal_2${post._id}`)
                              .close()
                          }
                          className="btn bg-green-500 px-6 hover:bg-green-400"
                        >
                          X Close
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
