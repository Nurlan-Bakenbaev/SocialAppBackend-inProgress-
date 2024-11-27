'use client';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
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
    <div>
      <div className="flex items-center justify-center h-screen gap-6">
        <div
          className="hidden md:block "
          style={{
            backgroundImage: "url('/signUp.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '600px',
            width: '500px',
            borderRadius: "40px"
          }}
        ></div>
        <fieldset
          className={`w-full max-w-sm p-4 shadow-lg
       rounded-lg duration-300 hover:scale-105 bg-white 
        ${error && 'error-shake'}`}
        >
          <h2 className="text-xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Full Name</label>
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
              <label htmlFor="username">Username</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
    </div>
  );
};

export default SignUp;
