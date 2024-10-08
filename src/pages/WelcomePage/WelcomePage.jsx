import React from 'react';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { AllUsersTab } from 'components/AllUsersTab/AllUsersTab';

export const WelcomePage = () => {
  return (
    <div className="max-w-[575px] flex justify-between flex-col px-[20px] md:p-0">
      <div>
        <p className="text-[#fafafa66] text-[14px] font-normal tracking-[2.8px] leading-none">
          EXPENSE LOG
        </p>
        <h1 className="text-[#fafafa] text-[32px] md:text-[56px] font-normal tracking-[-1.12px] mt-[10px] leading-none">
          Manage Your{' '}
          <span className="text-[springgreen] underline">Finances</span>{' '}
          Masterfully!
        </h1>
        <p className="text-[#fafafa66] text-[14px] md:text-[16px] font-light tracking-[-0.32px] mt-[20px] max-w-[533px] leading-none">
          ExpenseTracker effortlessly empowers you to take control of your
          finances! With intuitive features, it simplifies the process of
          tracking and managing expenses, allowing for a stress-free mastery
          over your financial world.
        </p>
        <div className="mt-[30px] md:mt-[40px]">
          <AuthNav />
        </div>
      </div>
      <div className="hidden xl:block">
        <AllUsersTab />
      </div>
    </div>
  );
};
