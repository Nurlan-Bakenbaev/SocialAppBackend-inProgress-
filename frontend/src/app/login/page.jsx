"use client";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Assuming you want to manage errors

  const handleChangeLogin = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center  ">
      <fieldset className="w-full max-w-md p-4 shadow-xl space-y-3 rounded-lg bg-white">
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
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            className="text-white font-bold px-7 
            right-0 btn bg-gradient-to-tr from-purple-500
            to-orange-500 transition-all ease-out duration-500
            hover:bg-gradient-to-tl hover:scale-105">
            Login
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
