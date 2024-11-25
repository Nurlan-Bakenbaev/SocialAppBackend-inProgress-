'use client';
import DaisyCard from '@/app/components/DaisyCard';
import Loading from '@/app/components/Loading';
import Posts from '@/app/components/Posts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
export const Profile = () => {
  const { id: userId } = useParams();
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
  console.log(data);
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
            src={data.data?.coverImg || '/banner-placeholder.png'}
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

          <div>
            <h1 className="text-2xl font-semibold mt-2">
              {data.data?.fullname}
            </h1>
            <p className="text-gray-500">{data.data?.username}</p>
            <p className="text-center mt-2">
              {data.data?.bio || 'This is my bio section'}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        <div>
          {data.data?.posts?.length === 0
            ? 'User has no posts'
            : data.data?.posts?.map((post, index) => (
                <div
                  key={index}
                  className="flex flex-row flex-wrap card bg-base-100 w-96 shadow-xl"
                >
                  <Posts postData={data?.data?.posts} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
