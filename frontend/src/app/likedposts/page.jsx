'use client';
import { useQuery } from '@tanstack/react-query';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
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
    enabled: !!user?._id,
  });
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center">Liked posts: </h2>
        <div className="flex flex-row flex-wrap items-center justify-center">
          {likedPosts?.data && <Posts postData={likedPosts.data} />}
        </div>
      </div>
    </div>
  );
};
export default LikedPosts;
