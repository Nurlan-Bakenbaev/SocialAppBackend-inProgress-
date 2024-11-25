'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FaRegBell } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import NotificationDialog from './NotificationDialog';
const NavBar = () => {
  const pathname = usePathname();
  const { data: user } = useQuery({ queryKey: ['authUser'] });
  const {
    isError,
    mutate: logOutMutation,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/auth/logout`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const data = res.json();
      } catch (error) {
        throw new Error(error.error);
      }
    },
    onSuccess: () => {
      toast.success('Logout successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to logout');
    },
  });
  if (pathname === '/login' || pathname === '/auth') {
    return null;
  }
  return (
    <div
      className={`shadow-lg mb-10 ${
        pathname === '/profile' || (pathname.startsWith('/userpage/') && 'mb-0')
      }`}
    >
      <nav className="navbar mx-auto w-[80%]">
        <div className="flex-1">
          <Link
            className="uppercase text-3xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text"
            href="/">
            Post-It
          </Link>
        </div>
        <ul>
          {!user ? (
            <Link
              className="m-5 hover:scale-105 hover:text-blue-500"
              href={'/auth'}
            >
              SignUp
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault(), logOutMutation();
              }}
              className="m-5  hover:scale-105 hover:text-blue-500"
              href={'/login'}
            >
              Logout
            </button>
          )}
          <NotificationDialog />
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
