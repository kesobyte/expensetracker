import React from 'react';
import { AuthForm } from 'components/AuthForm/AuthForm';

export const RegisterPage = () => {
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <div className="flex flex-col justify-center md:max-w-[399px] xl:min-w-[575px] w-full px-[20px] md:px-0">
      <div>
        <h3 className="text-white text-[32px] md:text-[56px] font-normal tracking-[-1.12px] leading-none">
          Sign Up
        </h3>
        <p className="text-[#fafafa66] text-[14px] md:text-[16px] font-light tracking-[-0.32px] mt-[20px] xl:w-[500px]">
          Step into a world of hassle-free expense management! Your journey
          towards financial mastery begins here.
        </p>
      </div>
      <div className="mt-[40px]">
        <AuthForm
          fields={fields}
          buttonText="Sign Up"
          footerText="Already have an account?"
          footerLink="./login"
          footerLinkText="Sign In"
          isLogin={false}
        />
      </div>
    </div>
  );
};
