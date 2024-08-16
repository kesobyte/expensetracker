import React from 'react';
import { Link } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <div className="flex gap-[20px]">
      <Link to="/register">
        <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen ease-in duration-200">
          Sign Up
        </button>
      </Link>
      <Link to="/login">
        <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-transparent border border-[rgba(250,250,250,0.4)] text-white text-[16px] font-normal tracking-[-0.32px] hover:border-springgreen ease-in duration-200">
          Sign In
        </button>
      </Link>
    </div>
  );
};
