import React from 'react';
import { TransactionsTotalAmount } from 'components/TransactionsTotalAmount/TransactionsTotalAmount';
import { TransactionsChart } from 'components/TransactionsChart/TransactionsChart';

export const MainTransactionsPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-[15px]">
        <h2 className="text-white text-[38px] font-normal tracking-[-0.76px]">
          Expense Log
        </h2>
        <p className="text-[#fafafa66] text-[16px] font-normal tracking-[-0.32px]">
          Capture and organize every penny spent with ease! A clear view of your
          financial habits at your fingertips.
        </p>
      </div>
      <div className="mt-[40px]">
        <TransactionsTotalAmount />
      </div>
      <div className="mt-[40px]">
        <TransactionsChart />
      </div>
    </div>
  );
};
