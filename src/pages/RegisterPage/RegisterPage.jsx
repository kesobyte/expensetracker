import React from 'react';
import { AuthForm } from 'components/AuthForm/AuthForm';

export const RegisterPage = () => {
  return (
    <div>
      <div className="max-w-[575px]">
        <h3 className="text-white text-[56px] font-normal tracking-[-1.12px] leading-none">
          Sign Up
        </h3>
        <p className="text-[#fafafa66] text-[16px] font-light tracking-[-0.32px] mt-[20px]">
          Step into a world of hassle-free expense management! Your journey
          towards financial mastery begins here.
        </p>
      </div>
      <div>
        <AuthForm />
      </div>
    </div>
  );
};
