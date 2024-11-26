'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect } from 'react';

const LoginDialog = () => {
  const { data: user, isLoading } = useQuery({ queryKey: ['authUser'] });

  useEffect(() => {
    if (!user && !isLoading) {
      const modal = document.getElementById('login_modal');
      modal?.showModal();
    }
  }, [user, isLoading]);

  return (
    <div>
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Please
            <Link className="mx-1 hover:text-blue-400 text-blue-700" href={'/auth'}>
              Sign Up!
            </Link>
          </h3>
          <p>Please log in or sign up to gain access to Post-IT.</p>
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

export default LoginDialog;
