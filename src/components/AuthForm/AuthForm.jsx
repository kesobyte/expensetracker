import React, { useState } from 'react';
import iconSvg from '../../images/icons.svg';

export const AuthForm = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form action="">
        <div className="flex flex-col gap-[24px]">
          <input
            className="w-[399px] inline-flex py-3 px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent text-white text-[16px] leading-[24px] font-normal hover:border-[springgreen] placeholder:text-[#fafafa66]"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-[399px] inline-flex py-3 px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent text-white text-[16px] leading-[24px] font-normal hover:border-[springgreen] placeholder:text-[#fafafa66]"
            type="email"
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="w-[399px] inline-flex py-3 pr-[50px] px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent text-white text-[16px] leading-[24px] font-normal hover:border-[springgreen] placeholder:text-[#fafafa66]"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              id="password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-4 inset-x-[72%]"
            >
              {showPassword ? (
                <svg>
                  <use href={`${iconSvg}#show-eye`} />
                </svg>
              ) : (
                <svg>
                  <use href={`${iconSvg}#close-eye`} />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen mt-[60px]">
          Sign Up
        </button>
        <div className="text-[12px] font-normal leading-[-18px] mt-[20px]">
          <p className="text-[#fafafa60]">
            Already have account?{' '}
            <span className="text-white underline cursor-pointer">Sign In</span>
          </p>
        </div>
      </form>
    </div>
  );
};
