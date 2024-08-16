import React from 'react';
import { Logo } from 'components/Logo/Logo';
import { TransactionsHistoryNav } from 'components/TransactionsHistoryNav/TransactionsHistoryNav';
import { UserBarBtn } from 'components/UserBarBtn/UserBarBtn';
import { useAuth } from 'hooks/useAuth';

export const Header = () => {
  const { isLoggedIn } = useAuth(true);

  return (
    <div
      className={`${
        isLoggedIn ? 'border-b-[1px] border-[#fafafa1a]' : ''
      } w-full`}
    >
      {isLoggedIn ? (
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between py-[18px] px-[17px]">
          <Logo />
          <TransactionsHistoryNav />
          <div className="cursor-pointer">
            <UserBarBtn />
          </div>
        </div>
      ) : (
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-center mt-[32px]">
          <Logo />
        </div>
      )}
    </div>
  );
};
