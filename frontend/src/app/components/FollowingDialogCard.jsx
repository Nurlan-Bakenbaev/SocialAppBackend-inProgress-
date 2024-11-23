import Link from 'next/link';
import React from 'react';
import { FaUsers } from 'react-icons/fa';

const FollowingDialogCard = ({ user }) => {
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
          <h3 className="font-bold text-lg">Your Friends list:</h3>
          <div>
            {user?.following.map((item) => (
              <Link
                className="flex flex-row p-2 border-b gap-2 items-center hover:scale-105 hover:bg-purple-100 even:bg-slate-100"
                key={item._id}
                href={`/userpage/${item._id}`}
              >
                <img
                  className="w-[30px] h-[30px]  rounded-full"
                  src={item.profileImg || '/userPlaceholder.png'}
                  alt={item.username}
                />
                <p>{item.fullname}</p>
              </Link>
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
