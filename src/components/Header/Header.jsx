import React from 'react';
import { Logo } from 'components/Logo/Logo';
import { TransactionsHistoryNav } from 'components/TransactionsHistoryNav/TransactionsHistoryNav';
import { UserBarBtn } from 'components/UserBarBtn/UserBarBtn';

export const Header = ({ isLoggedIn }) => {
  return (
    <div
      className={`flex ${isLoggedIn ? 'justify-between' : 'justify-center'}`}
    >
      <Logo />
      {isLoggedIn && <TransactionsHistoryNav />}
      {isLoggedIn && <UserBarBtn />}
    </div>
  );
};
