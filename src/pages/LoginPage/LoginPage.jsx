import React from 'react';
import { AuthForm } from 'components/AuthForm/AuthForm';

export const LoginPage = () => {
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <div className="flex flex-col justify-center max-w-[575px] w-full">
      <div>
        <h3 className="text-white text-[56px] font-normal tracking-[-1.12px] leading-none">
          Sign In
        </h3>
        <p className="text-[#fafafa66] text-[16px] font-light tracking-[-0.32px] mt-[20px] w-[500px]">
          Welcome back to effortless expense tracking! Your financial dashboard
          awaits.
        </p>
      </div>
      <div className="mt-[40px]">
        <AuthForm
          fields={fields}
          buttonText="Sign In"
          footerText="Don't have an account?"
          footerLink="./register"
          footerLinkText="Sign Up"
        />
      </div>
    </div>
  );
};
