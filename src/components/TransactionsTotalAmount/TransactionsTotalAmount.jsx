import React from 'react';
import iconSvg from '../../images/icons.svg';
import { useSelector } from 'react-redux';
import { selectTransactionsTotal } from '../../redux/user/selectors';
import { selectUser } from '../../redux/user/selectors';
import {
  selectExchangeRates,
  selectExchangeRatesStatus,
} from '../../redux/exchangeRate/selectors';

export const TransactionsTotalAmount = () => {
  const transactionsTotal = useSelector(selectTransactionsTotal);
  const user = useSelector(selectUser);
  const exchangeRates = useSelector(selectExchangeRates);
  const exchangeRatesStatus = useSelector(selectExchangeRatesStatus);

  // Get the user's selected currency
  const selectedCurrency = user.currency || 'usd'; // Default to USD if no currency is selected
  const exchangeRate = exchangeRates[selectedCurrency.toUpperCase()] || 1; // Fallback to 1 (USD) if exchange rate is not available
  const currencySymbol =
    {
      uah: '₴',
      usd: '$',
      eur: '€',
    }[selectedCurrency] || '$';

  // Convert the total amounts based on the selected currency and format with commas
  const totalIncome = (transactionsTotal.incomes * exchangeRate).toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  const totalExpense = (
    transactionsTotal.expenses * exchangeRate
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (exchangeRatesStatus === 'loading') {
    return <p>Loading exchange rates...</p>;
  }

  if (exchangeRatesStatus === 'failed') {
    return <p>Failed to load exchange rates. Please try again later.</p>;
  }

  return (
    <div className="flex gap-[24px]">
      <div className="bg-[#171719] w-[303px] h-[121px] flex-shrink-0 rounded-[30px] flex items-center gap-[22px]">
        <div className="ml-[23px] w-[43px] h-[43px] flex-shrink-0 bg-springgreen rounded-[13px] flex items-center justify-center">
          <svg width="15" height="17">
            <use href={`${iconSvg}#arrow-down`} />
          </svg>
        </div>

        <div className="flex flex-col gap-[7px]">
          <p className="text-[#fafafa80] text-[16px] font-normal">
            Total Expense
          </p>
          <div className="flex items-center">
            <p className="text-[#fafafa] text-[24px] font-bold">{`${currencySymbol}${totalExpense}`}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#171719] w-[303px] h-[121px] flex-shrink-0 rounded-[30px] flex items-center gap-[22px]">
        <div className="ml-[23px] w-[43px] h-[43px] flex-shrink-0 bg-springgreen rounded-[13px] flex items-center justify-center">
          <svg width="15" height="17">
            <use href={`${iconSvg}#arrow-up`} />
          </svg>
        </div>

        <div className="flex flex-col gap-[7px]">
          <p className="text-[#fafafa80] text-[16px] font-normal">
            Total Income
          </p>
          <div className="flex items-center">
            <p className="text-[#fafafa] text-[24px] font-bold">{`${currencySymbol}${totalIncome}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
