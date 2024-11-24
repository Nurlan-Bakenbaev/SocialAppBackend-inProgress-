'use client';
import { useQuery } from '@tanstack/react-query';
import Posts from '../components/Posts';
const LikedPosts = () => {
  const { data: user } = useQuery({ queryKey: ['authUser'] });
  const {
    data: likedPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['likedPosts'],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/posts/likedposts/${user._id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error('Failed to fetch liked posts');
        }
        return await res.json();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return (
    <div>
      <div className="w-full flex flex-col  items-center justify-center">
        <h2 className="text-2xl font-semibold">Liked posts: </h2>
        <div>{likedPosts && <Posts postData={likedPosts} />}</div>
      </div>
    </div>
  );
};
export default LikedPosts;
