import React from 'react';
import { useParams } from 'react-router-dom';
import { TransactionsTotalAmount } from 'components/TransactionsTotalAmount/TransactionsTotalAmount';
import { TransactionSearchTool } from 'components/TransactionSearchTools/TransactionSearchTools';
import { TransactionList } from 'components/TransactionList/TransactionList';

export const TransactionHistoryPage = () => {
  const { transactionsType } = useParams(); // Get the dynamic route parameter

  const pageTitle =
    transactionsType === 'incomes' ? 'All Income' : 'All Expense';
  const pageDescription =
    transactionsType === 'incomes'
      ? 'Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.'
      : 'View and manage every transaction seamlessly! Your entire financial landscape, all in one place.';

  return (
    <div className="w-full xl:max-w-[1240px] px-[20px] xl:px-0">
      <div className="flex flex-col xl:flex-row gap-[40px] xl :gap-[90px] w-full">
        <div className="xl:w-1/2">
          <h1 className="text-[32px] md:text-[38px] text-white">{pageTitle}</h1>
          <p className="text-[14px] md:text-[16px] text-gray-400 mt-2]">
            {pageDescription}
          </p>
        </div>
        <div className="xl:w-1/2">
          <TransactionsTotalAmount />
        </div>
      </div>

      <div>
        <div className="flex flex-col bg-[#171719] py-[20px] mt-[40px] rounded-[30px] gap-[20px]">
          <div className="px-[20px]">
            <TransactionSearchTool transactionsType={transactionsType} />
          </div>

          <TransactionList transactionsType={transactionsType} />
        </div>
      </div>
    </div>
  );
};
