import React from 'react';

export const TransactionsHistoryNav = () => {
  return (
    <div className="flex justify-center gap-[16px]">
      <button className="rounded-[30px] bg-transparent border border-[#fafafa66] px-[21px] py-[12px] text-white text-[16px] font-normal leading-normal tracking-[-0.32px]">
        All Expense
      </button>
      <button className="rounded-[30px] bg-transparent border border-[#fafafa66] px-[21px] py-[12px] text-white text-[16px] font-normal leading-normal tracking-[-0.32px]">
        All Income
      </button>
    </div>
  );
};
