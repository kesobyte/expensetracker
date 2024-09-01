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
    <div>
      <div className="flex gap-[90px] max-w-[1240px]">
        <div>
          <h1 className="text-[38px] text-white">{pageTitle}</h1>
          <p className="text-[16px] text-gray-400 mt-2">{pageDescription}</p>
        </div>
        <TransactionsTotalAmount transactionsType={transactionsType} />
        {/* Pass transactionsType to TransactionsTotalAmount */}
      </div>

      <TransactionSearchTool transactionsType={transactionsType} />
      {/* Pass transactionsType to TransactionSearchTool if needed */}

      <TransactionList transactionsType={transactionsType} />
      {/* Pass transactionsType to TransactionList */}
    </div>
  );
};
