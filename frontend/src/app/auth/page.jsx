'use client';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
const SignUp = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const { mutate, isError, isLoading, error, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    },
    onSuccess: () => {
      toast.success('User created successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.error || 'Failed to create user');
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(userData);
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <fieldset
        className={`w-full max-w-md p-5 shadow-lg
       rounded-lg duration-300 hover:scale-105 
        ${error && 'error-shake'}`}
      >
        <h2 className="text-xl font-bold text-center mb-2">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="label">
              Full Name
            </label>
            <input
              name="fullname"
              onChange={handleChange}
              id="fullname"
              type="text"
              value={userData.fullname}
              placeholder="Will Smith"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              name="username"
              onChange={handleChange}
              id="username"
              type="text"
              value={userData.username}
              placeholder="will_smith"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              id="email"
              type="email"
              value={userData.email}
              placeholder="willsmith@mail.com"
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
              onChange={handleChange}
              id="password"
              type="password"
              value={userData.password}
              placeholder="********"
              className="input input-bordered w-full"
              required
            />
            {isError && (
              <p className="text-sm text-red-500 mt-2">{error.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn text-white mt-3 font-bold w-full py-2 rounded-lg transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-tr from-purple-500 to-orange-500 hover:bg-gradient-to-tl hover:scale-105'
            }`}
          >
            {isPending ? 'Loading' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="link text-blue-600">
            Log in
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default SignUp;
