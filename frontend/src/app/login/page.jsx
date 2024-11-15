'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const handleChangeLogin = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const queryClient = useQueryClient();
  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (userData) => {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      toast.success('Login successfully!');

      router.push('/');

      queryClient.invalidateQueries({
        queryKey: ['authUser'],
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(userData);
  };

  return (
    <div className="flex items-center justify-center h-screen my-auto  ">
      <fieldset className="w-full  max-w-md p-4 shadow-xl space-y-3 rounded-lg bg-white">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              name="email"
              onChange={handleChangeLogin}
              id="email"
              type="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              name="password"
              onChange={handleChangeLogin}
              id="password"
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              required
            />
            <p className="text-red-500">{error?.message}</p>
          </div>
          <button
            type="submit"
            className="text-white font-bold px-7 w-full 
            right-0 btn bg-gradient-to-tr from-purple-500
            to-orange-500 transition-all ease-out duration-500
            hover:bg-gradient-to-tl hover:scale-105"
          >
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          Don't have an account?
          <Link href="/auth" className="link text-blue-600">
            Sign Up
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
