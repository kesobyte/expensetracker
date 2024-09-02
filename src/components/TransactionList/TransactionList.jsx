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
  selectError,
} from '../../redux/transaction/selectors';
import { Loader } from 'components/Loader/Loader';
import { selectFilter, selectStartDate } from '../../redux/filter/selectors';
import { selectUser } from '../../redux/user/selectors';
import { fetchExchangeRates } from '../../redux/exchangeRate/exchangeRateOperation';
import {
  selectExchangeRates,
  selectExchangeRatesStatus,
} from '../../redux/exchangeRate/selectors';

export const TransactionList = ({ transactionsType }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const filter = useSelector(selectFilter);
  const startDate = useSelector(selectStartDate);
  const user = useSelector(selectUser);
  const exchangeRates = useSelector(selectExchangeRates);
  const exchangeRatesStatus = useSelector(selectExchangeRatesStatus);

  useEffect(() => {
    if (transactionsType) {
      dispatch(getTransactions({ type: transactionsType })); // Fetch based on transactionsType
    }

    // Fetch exchange rates when the component mounts
    if (user.currency) {
      dispatch(fetchExchangeRates('USD')); // Fetching from USD as base currency
    }
  }, [dispatch, transactionsType, user.currency]);

  const handleEditClick = transaction => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  // Convert sum to selected currency using fetched exchange rates
  const convertSum = sum => {
    if (!exchangeRates || !user.currency) return sum;

    const rate = exchangeRates[user.currency.toUpperCase()] || 1;
    return sum * rate;
  };

  // Filter logic
  const filteredTransactions = transactions.filter(transaction => {
    // Match by filter text (comment or category name)
    const matchFilter = filter
      ? transaction.comment.toLowerCase().includes(filter.toLowerCase()) ||
        transaction.category.categoryName
          .toLowerCase()
          .includes(filter.toLowerCase())
      : true;

    // Match by date (if a date filter is active)
    const matchDate = startDate
      ? new Date(transaction.date) >=
        new Date(startDate.year, startDate.month - 1, startDate.day)
      : true;

    return matchFilter && matchDate;
  });

  const handleDeleteClick = transactionId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );
    if (confirmed) {
      dispatch(deleteTransaction(transactionId));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTransaction(null);
  };

  // Get the user's selected currency symbol
  const currencySymbol =
    {
      uah: '₴',
      usd: '$',
      eur: '€',
    }[user.currency] || '$';

  return (
    <div className="">
      {loading && (
        <div className="flex justify-center mt-[5%]">
          <Loader />{' '}
        </div>
      )}

      {error && <p>Error: {error}</p>}
      {!loading && exchangeRatesStatus === 'loading' && (
        <p>Loading exchange rates...</p>
      )}
      {!loading && exchangeRatesStatus === 'failed' && (
        <p>Failed to load exchange rates. Please try again later.</p>
      )}
      {!loading && exchangeRatesStatus === 'succeeded' && (
        <>
          <div className="bg-gray-800 text-gray-300 flex justify-between items-center px-[40px] py-[10px]">
            <div className="w-1/6">Category</div>
            <div className="w-2/6">Comment</div>
            <div className="w-1/6">Date</div>
            <div className="w-1/6">Time</div>
            <div className="w-1/6">Sum</div>
            <div className="w-1/6">Actions</div>
          </div>
          <div className="bg-gray-900 text-gray-300 px-[40px] py-[10px]">
            {filteredTransactions.map(transaction => (
              <div
                key={transaction._id}
                className="flex justify-between items-center py-2  last:border-0"
              >
                <div className="w-1/6">{transaction.category.categoryName}</div>
                <div className="w-2/6">{transaction.comment}</div>
                <div className="w-1/6">{transaction.date}</div>
                <div className="w-1/6">{transaction.time}</div>
                <div className="w-1/6">
                  {currencySymbol}
                  {convertSum(transaction.sum)
                    .toFixed(2) // Ensure two decimal places
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <div className="w-1/6 flex justify-around">
                  <button
                    className="bg-green-500 text-black rounded-full px-4 py-1"
                    onClick={() => handleEditClick(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-black text-gray-300 rounded-full px-4 py-1"
                    onClick={() => handleDeleteClick(transaction._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <TransactionForm
            transactionData={currentTransaction}
            type={currentTransaction?.type || transactionsType}
            onSubmit={handleModalClose} // Only close the modal
          />
          <button
            className="absolute top-4 right-4 text-white"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
