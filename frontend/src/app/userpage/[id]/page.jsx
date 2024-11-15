'use client';
import DaisyCard from '@/app/components/DaisyCard';
import Loading from '@/app/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
export const Profile = () => {
  const { id: userId } = useParams();
  const {
    data: userData,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['getUser', userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/api/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    // RUNS ONLY WHEN userid is Set
    enabled: !!userId,
  });
  const user = userData?.data;
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  console.log(user.posts);
  if (fetchError) return <div>Error: {fetchError.message}</div>;
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="relative w-full shadow-xl rounded-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-tr from-orange-400 to-purple-400 relative">
          <img src={user?.coverImg || '/banner-placeholder.png'} alt="Banner" className="w-full h-full object-cover" />
        </div>

        <div className="p-4 flex flex-col items-center">
          <div className="w-40 h-40 -mt-20 rounded-full ring-1 ring-slate-400 overflow-hidden relative">
            <img src={user?.profileImg} alt="Profile" className="w-full h-full object-cover bg-white" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold mt-2">{user?.fullname}</h1>
            <p className="text-gray-500">{user?.username}</p>
            <p className="text-center mt-2">{user?.bio || 'This is my bio section'}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
        <div>
          {user?.posts?.length === 0
            ? 'User has no posts'
            : user?.posts?.map((post, index) => (
                <div key={index} className="card bg-base-100 w-96 shadow-xl">
                  <DaisyCard img={post.img} text={post.text} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
