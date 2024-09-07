import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionForm } from 'components/TransactionForm/TransactionForm';
import {
  getTransactions,
  deleteTransaction,
} from '../../redux/transaction/transactionOperation';
import {
  selectTransactions,
  selectLoading,
} from '../../redux/transaction/selectors';
import { Loader } from 'components/Loader/Loader';
import { selectFilter, selectStartDate } from '../../redux/filter/selectors';
import { selectUser } from '../../redux/user/selectors';
import { fetchExchangeRates } from '../../redux/exchangeRate/exchangeRateOperation';
import {
  selectExchangeRates,
  selectExchangeRatesStatus,
} from '../../redux/exchangeRate/selectors';
import svg from '../../images/icons.svg';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

export const TransactionList = ({ transactionsType }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const filter = useSelector(selectFilter);
  const startDate = useSelector(selectStartDate);
  const user = useSelector(selectUser);
  const exchangeRates = useSelector(selectExchangeRates);
  const exchangeRatesStatus = useSelector(selectExchangeRatesStatus);

  useEffect(() => {
    if (transactionsType) {
      dispatch(getTransactions({ type: transactionsType }));
    }
    if (user.currency) {
      dispatch(fetchExchangeRates('USD'));
    }
  }, [dispatch, transactionsType, user.currency]);

  const handleEditClick = transaction => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const convertSum = sum => {
    if (!exchangeRates || !user.currency) return sum;
    const rate = exchangeRates[user.currency.toUpperCase()] || 1;
    return sum * rate;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchFilter = filter
      ? transaction.comment.toLowerCase().includes(filter.toLowerCase()) ||
        transaction.category.categoryName
          .toLowerCase()
          .includes(filter.toLowerCase())
      : true;

    const matchDate = startDate
      ? new Date(transaction.date).getFullYear() === startDate.year &&
        new Date(transaction.date).getMonth() === startDate.month - 1 &&
        new Date(transaction.date).getDate() === startDate.day
      : true;

    return matchFilter && matchDate;
  });

  const handleDeleteClick = transactionId => {
    Confirm.show(
      'Confirm',
      'Do you want to delete the record?',
      'Yes',
      'No',
      () => {
        dispatch(deleteTransaction(transactionId));
      }
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTransaction(null);
  };

  const currencySymbol =
    {
      uah: 'UAH',
      usd: 'USD',
      eur: 'EUR',
    }[user.currency] || '$';

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="w-full max-h-[400px] overflow-x-auto">
      {/* Table structure */}
      <table className="bg-[#171719] w-full">
        <thead className="bg-[#00000033]">
          <tr className="text-[#fafafa66] text-left text-[12px] md:text-[16px]">
            <th className="p-[10px] xl:p-[20px] md:w-[15%] font-normal">
              Category
            </th>
            <th className="p-[10px] xl:p-[20px] md:w-[25%] font-normal">
              Comment
            </th>
            <th className="p-[10px] xl:p-[20px] md:w-[15%] font-normal">
              Date
            </th>
            <th className="p-[10px] xl:p-[20px] md:w-[10%] font-normal">
              Time
            </th>
            <th className="p-[10px] xl:p-[20px] md:w-[12%] font-normal">Sum</th>
            <th className="p-[10px] xl:p-[20px] w-[10%] xl:w-[23%] font-normal">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="flex justify-center">
                <Loader />
              </td>
            </tr>
          )}
          {!loading && exchangeRatesStatus === 'loading' && (
            <tr>
              <td colSpan={6} className="flex justify-center">
                Loading exchange rates...
              </td>
            </tr>
          )}
          {!loading && exchangeRatesStatus === 'failed' && (
            <tr>
              <td colSpan={6} className="flex justify-center">
                Failed to load exchange rates. Please try again later.
              </td>
            </tr>
          )}

          {!loading &&
            exchangeRatesStatus === 'succeeded' &&
            filteredTransactions.map(transaction => (
              <tr
                key={transaction._id}
                className="text-white text-[14px] md:text-[18px]"
              >
                <td className="p-[10px] xl:p-[20px] md:w-[15%]">
                  {transaction.category.categoryName}
                </td>
                <td className="p-[2px] xl:p-[20px] md:w-[25%]">
                  {transaction.comment}
                </td>
                <td className="p-[10px] xl:p-[20px] md:w-[15%]">
                  {transaction.date}
                </td>
                <td className="p-[10px] xl:p-[20px] md:w-[10%]">
                  {transaction.time}
                </td>
                <td className="text-nowrap p-[10px] xl:p-[20px] md:w-[12%]">
                  {convertSum(transaction.sum)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  / {currencySymbol}
                </td>
                <td className="p-[10px] xl:p-[20px] flex w-full gap-[10px]">
                  <button
                    className="flex xl:gap-[10px] bg-[springgreen] text-black text-[12px] md:text-[16px] rounded-full p-[14px] xl:px-[30px] xl:py-[14px] leading-none hover:bg-[mediumseagreen]"
                    onClick={() => handleEditClick(transaction)}
                  >
                    <svg height={16} width={16}>
                      <use href={`${svg}#pencil-icon`}></use>
                    </svg>
                    <span className="sr-only xl:not-sr-only">Edit</span>
                  </button>
                  <button
                    className="flex xl:gap-[10px] bg-[black] text-white text-[12px] md:text-[16px] rounded-full p-[14px] xl:px-[30px] xl:py-[14px] leading-none hover:text-[#fafafa66]"
                    onClick={() => handleDeleteClick(transaction._id)}
                  >
                    <svg
                      className="stroke-current text-white group-hover:text-[#fafafa66]"
                      height={16}
                      width={16}
                    >
                      <use href={`${svg}#trash-icon`}></use>
                    </svg>
                    <span className="sr-only xl:not-sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for Editing Transactions */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#0c0d0d99] flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <TransactionForm
            transactionData={currentTransaction}
            type={currentTransaction?.type || transactionsType}
            onSubmit={handleModalClose}
          />
          <button
            className="absolute top-[11%] left-[43%] text-white"
            onClick={handleModalClose}
          ></button>
        </div>
      )}
    </div>
  );
};
