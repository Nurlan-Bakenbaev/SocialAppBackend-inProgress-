import useFollow from '@/hooks/useFollow';
import Link from 'next/link';
import React from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

const FollowingDialogCard = ({ user }) => {
  const { followUnFollow, isPending } = useFollow();
  return (
    <div>
      <button
        className="btn m-1"
        onClick={() =>
          document.getElementById(`following + ${user?._id} `).showModal()
        }
      >
        <FaUsers color="blue" className=" mr-1" />
        {user?.following?.length} Following
      </button>
      <dialog
        id={`following + ${user?._id} `}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Your friends list:</h3>
          <div>
            {user?.following.map((item) => (
              <div
                className="flex flex-row p-2 border-b justify-between hover:scale-105 hover:bg-purple-100 even:bg-slate-100"
                key={item._id}
              >
                <Link
                  href={`/userpage/${item._id}`}
                  className="flex flex-row gap-2 items-center hover:font-bold"
                >
                  <img
                    className="w-[30px] h-[30px]  rounded-full"
                    src={item.profileImg || '/userPlaceholder.png'}
                    alt={item.username}
                  />
                  <p>{item.fullname}</p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault(), followUnFollow(item._id);
                  }}
                  className="flex items-center bg-gradient-to-r from-purple-400 to-orange-400 text-white rounded py-1 px-3 hover:bg-blue-700 transition-colors"
                >
                  <FaUserPlus className="mr-1" />
                  {isPending ? 'Loading...' : 'Unfollow'}
                </button>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FollowingDialogCard;
