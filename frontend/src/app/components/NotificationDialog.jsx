'use client';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import NotificationCard from './NotificationCard';
import { FaRegBell } from 'react-icons/fa';
import { FiAlertOctagon } from 'react-icons/fi';
const NotificationDialog = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['getNotify'],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/notifications/notify`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
  });
  const { mutate: DeleteNotify, isPending } = useMutation({
    mutationKey: ['deleteNotify'],
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/notifications/delete`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotify'] });
      toast.success(deleteData.message);
    },
  });
  return (
    <div>
      <button
        className={` relative btn  hover:bg-purple-100`}
        onClick={() => document.getElementById('notify').showModal()}
      >
        <FaRegBell className="shake-hover" fontSize={18} />
        {data?.length ? (
          <span
            className=" border bg-red-500 p-1 rounded-full w-5 h-5 
        flex items-center absolute bottom-0  right-1 
         text-slate-200 font-bold "
          >
            {data?.length}
          </span>
        ) : null}
      </button>
      <dialog id="notify" className="modal">
        <div className="modal-box">
          {data?.length === 0 ? (
            <span>
              <FiAlertOctagon color="red" fontSize={25} />
              <p>No notifications</p>
            </span>
          ) : (
            data?.map((item, index) => (
              <NotificationCard key={index} data={item} />
            ))
          )}
          <div className="modal-action">
            <button onClick={() => DeleteNotify()} className="btn bg-red-300">
              {isPending ? 'Deleting' : 'Delete'}
            </button>
            <form method="dialog">
              <button className="btn bg-blue-200">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NotificationDialog;
