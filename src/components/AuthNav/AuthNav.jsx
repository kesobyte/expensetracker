import React from 'react';

export const AuthNav = () => {
  return (
    <div className="flex gap-[20px]">
      <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen">
        Sign Up
      </button>
      <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-transparent border border-[rgba(250,250,250,0.4)] text-white text-[16px] font-normal tracking-[-0.32px] hover:border-springgreen">
        Sign In
      </button>
    </div>
  );
};
