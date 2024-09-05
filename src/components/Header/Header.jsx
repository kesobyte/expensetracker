import React from 'react';
import { Logo } from 'components/Logo/Logo';
import { TransactionsHistoryNav } from 'components/TransactionsHistoryNav/TransactionsHistoryNav';
import { UserBarBtn } from 'components/UserBarBtn/UserBarBtn';
import { useAuth } from 'hooks/useAuth';
import { BurgerMenuBtn } from 'components/BurgerMenuBtn/BurgerMenuBtn';

export const Header = () => {
  const { isLoggedIn } = useAuth(true);

  return (
    <div
      className={`${
        isLoggedIn ? 'border-b-[1px] border-[#fafafa1a]' : ''
      } w-full`}
    >
      {isLoggedIn ? (
        <div className="max-w-[1240px] flex items-center justify-between py-[18px] mx-auto md:px-[32px] xl:px-0">
          <Logo />

          <div className="xl:hidden">
            <BurgerMenuBtn />
          </div>
          <div className="hidden xl:block">
            <TransactionsHistoryNav />
          </div>
          <div className="hidden cursor-pointer xl:block">
            <UserBarBtn />
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto flex items-center justify-center mt-[20px] md:mt-[32px]">
          <Logo />
        </div>
      )}
    </div>
  );
};
