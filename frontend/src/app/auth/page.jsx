"use client";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const error = false;

  const handleChangeSignUp = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center">
      <fieldset className="w-full max-w-md p-4 shadow-xl rounded-lg bg-white">
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <form className="space-y-2">
          <div>
            <label htmlFor="fullname" className="label">
              Full Name
            </label>
            <input
              name="fullname"
              onChange={handleChangeSignUp}
              id="fullname"
              type="text"
              placeholder="Jake Nolan"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="label">
              User Name
            </label>
            <input
              name="username"
              onChange={handleChangeSignUp}
              id="username"
              type="text"
              placeholder="nolan_1991"
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
              onChange={handleChangeSignUp}
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
              onChange={handleChangeSignUp}
              id="password"
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              required
            />
            {error && (
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-white font-bold px-7 right-0 btn bg-gradient-to-tr from-purple-500 to-orange-500 transition-all ease-out duration-500 hover:bg-gradient-to-tl hover:scale-105">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link href="/login" className="link text-blue-600">
            Log in
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default SignUp;
