import React from 'react';
import { NavLink } from 'react-router-dom';

export const TransactionsHistoryNav = ({ onClose }) => {
  return (
    <div className="flex flex-col xl:flex-row justify-center gap-[16px]">
      <NavLink
        onClick={onClose}
        to="/transactions/history/expenses"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-[16px] font-normal leading-none tracking-[-0.32px] hover:border-springgreen ${
            isActive
              ? 'border border-black bg-black xl:bg-[springgreen] text-white xl:text-[--black]'
              : 'bg-transparent border border-black xl:border-[#fafafa66] text-black xl:text-white'
          }`
        }
      >
        All Expense
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/transactions/history/incomes"
        className={({ isActive }) =>
          `rounded-[30px] px-[21px] py-[12px] text-[16px] font-normal leading-none tracking-[-0.32px] hover:border-springgreen ${
            isActive
              ? 'border border-black bg-black xl:bg-[springgreen] text-white xl:text-[--black]'
              : 'bg-transparent border border-black xl:border-[#fafafa66] text-black xl:text-white'
          }`
        }
      >
        All Income
      </NavLink>
    </div>
  );
};
