import React from 'react';

export const AuthForm = () => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col gap-[24px]">
          <input
            className="w-[399px] inline-flex py-3 px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-[399px] inline-flex py-3 px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent"
            type="email"
            placeholder="Email"
          />
          <input
            className=" w-[399px] inline-flex py-3 px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen">
          Sign Up
        </button>
        <p className="text-white">
          Already have account? <span>Sign In</span>
        </p>
      </form>
    </div>
  );
};
