import React from 'react';
import { useParams } from 'react-router-dom';
import { TransactionsTotalAmount } from 'components/TransactionsTotalAmount/TransactionsTotalAmount';
import { TransactionsChart } from 'components/TransactionsChart/TransactionsChart';
import { TransactionForm } from 'components/TransactionForm/TransactionForm';

export const MainTransactionsPage = () => {
  const { transactionsType } = useParams(); // Extract the type from the URL

  return (
    <div className="flex gap-[44px]">
      <div className="max-w-[630px]">
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-white text-[38px] font-normal tracking-[-0.76px]">
            Expense Log
          </h2>
          <p className="text-[#fafafa66] text-[16px] font-normal tracking-[-0.32px]">
            Capture and organize every penny spent with ease! A clear view of
            your financial habits at your fingertips.
          </p>
        </div>
        <div className="mt-[40px]">
          <TransactionsTotalAmount />
        </div>
        <div className="mt-[40px]">
          <TransactionsChart />
        </div>
      </div>

      {/* Form */}
      <div>
        <TransactionForm type={transactionsType} />{' '}
        {/* Pass the URL type to TransactionForm */}
      </div>
    </div>
  );
};
