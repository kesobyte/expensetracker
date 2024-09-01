import React from 'react';
import { NavLink } from 'react-router-dom';

export const TransactionsHistoryNav = () => {
  return (
    <div className="flex justify-center gap-[16px] mt-4">
      <NavLink
        to="/transactions/history/expenses"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-white text-[16px] font-normal leading-normal tracking-[-0.32px] ${
            isActive
              ? 'bg-[springgreen] text-black'
              : 'bg-transparent border border-[#fafafa66]'
          }`
        }
      >
        All Expense
      </NavLink>
      <NavLink
        to="/transactions/history/incomes"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-white text-[16px] font-normal leading-normal tracking-[-0.32px] ${
            isActive
              ? 'bg-[springgreen] text-black'
              : 'bg-transparent border border-[#fafafa66]'
          }`
        }
      >
        All Income
      </NavLink>
    </div>
  );
};
