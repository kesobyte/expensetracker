import React from 'react';
import { NavLink } from 'react-router-dom';

export const TransactionsHistoryNav = () => {
  return (
    <div className="flex justify-center gap-[16px]">
      <NavLink
        to="/transactions/history/expenses"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-[16px] font-normal leading-none tracking-[-0.32px] hover:border-springgreen ${
            isActive
              ? 'bg-[springgreen] text-[--black]'
              : 'bg-transparent border border-[#fafafa66] text-white'
          }`
        }
      >
        All Expense
      </NavLink>
      <NavLink
        to="/transactions/history/incomes"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-[16px] font-normal leading-none tracking-[-0.32px] hover:border-springgreen ${
            isActive
              ? 'bg-[springgreen] text-[--black]'
              : 'bg-transparent border border-[#fafafa66] text-white'
          }`
        }
      >
        All Income
      </NavLink>
    </div>
  );
};
