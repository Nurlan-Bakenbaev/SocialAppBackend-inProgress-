import React, { useEffect } from 'react';
import Posts from './Posts';
import PostsSkeleton from './Skeleton/PostSkeletone';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';

const Feed = ({ feedType }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case 'latest':
        return `${process.env.NEXT_PUBLIC_URL}api/posts/all`;
      case 'following':
        return `${process.env.NEXT_PUBLIC_URL}api/posts/following`;
      default:
        return `${process.env.NEXT_PUBLIC_URL}api/posts/all`;
    }
  };
  const POST_ENDPOINT = getPostEndPoint();
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(data.error);
        }
        const data = await res.json();

        return data;
      } catch (error) {
        throw new Error(data.error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);
  if (data?.length === 0) {
    return <p className="text-red-500">Posts not found</p>;
  }
  return (
    <div>
      <h2 className="text-xl  my-4">
        {feedType === 'latest' ? 'Latest Posts' : 'Following posts'}
      </h2>

      {!data || isRefetching ? (
        <PostsSkeleton />
      ) : (
        <Posts postData={data.data} />
      )}
    </div>
  );
};

export default Feed;
