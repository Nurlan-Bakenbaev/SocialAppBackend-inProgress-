'use client';
import DaisyCard from '@/app/components/DaisyCard';
import Loading from '@/app/components/Loading';
import Posts from '@/app/components/Posts';
import useFollow from '@/hooks/useFollow';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FaUserPlus } from 'react-icons/fa';
export const Profile = () => {
  const { id: userId } = useParams();
  const { followUnFollow, isPending } = useFollow();
  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['getUser', userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/users/profile/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    // RUNS ONLY WHEN userid is Set
    enabled: !!userId,
  });
  const { data: currentUser } = useQuery({ queryKey: ['authUser'] });
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (fetchError) return <div>Error: {fetchError.message}</div>;
  return (
    <div className="min-h-screen flex flex-col items-center text-center">
      <div className="relative w-full shadow-xl rounded-lg overflow-hidden">
        <div className="h-60 bg-slate-500 relative">
          <img
            src={data.data?.coverImg || '/meta-banner.jpg'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col items-center">
          <div className="w-40 h-40 -mt-24 rounded-full ring-1 ring-slate-400 overflow-hidden relative">
            <img
              src={data.data?.profileImg || '/user-place.png'}
              alt="Profile"
              className="w-full h-full object-cover bg-white"
            />
          </div>
          {currentUser?._id !== userId && (
            <button
              onClick={(e) => {
                e.preventDefault(), followUnFollow(userId);
              }}
              className="flex my-4 items-center bg-gradient-to-r from-purple-400 to-orange-400 text-white rounded py-1 px-3 hover:bg-blue-700 transition-colors"
            >
              <FaUserPlus className="mr-1" />
              {isPending ? 'Loading...' : 'Follow'}
            </button>
          )}
          <div>
            <h1 className="text-2xl font-semibold mt-2">
              {data.data?.fullname}
            </h1>
            <p className="text-gray-500">{data.data?.username}</p>
            <p className="text-center mt-2">
              {data.data?.bio || 'This is my bio section'}
            </p>
            <p>
              Created:
              {new Date(data.data.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        <div>
          {data.data?.posts?.length === 0 ? (
            ' No posts'
          ) : (
            <Posts postData={data?.data?.posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
