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
  // selectError,
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
  // const error = useSelector(selectError);

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
    // const matchDate = startDate
    //   ? new Date(transaction.date) >=
    //     new Date(startDate.year, startDate.month - 1, startDate.day)
    //   : true;

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

  // Get the user's selected currency symbol
  const currencySymbol =
    {
      uah: 'UAH',
      usd: 'USD',
      eur: 'EUR',
    }[user.currency] || '$';

  // Handle backdrop click to close the modal
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  // Function to handle keydown event
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    // Add event listener for keydown when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="">
      <div className="flex justify-between items-center bg-[#00000033] px-[40px] py-[20px] leading-none text-[16px] text-[#fafafa66] h-full">
        <div className="w-[15%]">Category</div>
        <div className="w-[25%]">Comment</div>
        <div className="w-[15%]">Date</div>
        <div className="w-[10%]">Time</div>
        <div className="w-[12%]">Sum</div>
        <div className="w-[23%]">Actions</div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center my-[40px]">
          <Loader />{' '}
        </div>
      )}

      {/* {error && <p>Error: {error}</p>} */}
      {!loading && exchangeRatesStatus === 'loading' && (
        <p>Loading exchange rates...</p>
      )}
      {!loading && exchangeRatesStatus === 'failed' && (
        <p>Failed to load exchange rates. Please try again later.</p>
      )}
      {!loading && exchangeRatesStatus === 'succeeded' && (
        <div className="bg-[#171719] text-white text-[17px] px-[40px] py-[10px] max-h-[275px] h-full leading-none overflow-auto">
          {filteredTransactions.map(transaction => (
            <div
              key={transaction._id}
              className="flex justify-between items-center py-[10px] last:border-0"
            >
              <div className="w-[15%]">{transaction.category.categoryName}</div>
              <div className="w-[25%]">{transaction.comment}</div>
              <div className="w-[15%]">{transaction.date}</div>
              <div className="w-[10%]">{transaction.time}</div>
              <div className="w-[12%]">
                {convertSum(transaction.sum)
                  .toFixed(0) // No decimal
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                / {currencySymbol}
              </div>
              <div className="w-[23%] flex gap-[8px]">
                <button
                  className="flex justify-center items-center gap-[10px] bg-[springgreen] text-black text-[16px] rounded-full px-[32px] py-[14px] leading-none hover:bg-[mediumseagreen]"
                  onClick={() => handleEditClick(transaction)}
                >
                  <span>
                    <svg height={16} width={16}>
                      <use href={`${svg}#pencil-icon`}></use>
                    </svg>
                  </span>
                  Edit
                </button>
                <button
                  className="flex justify-center items-center gap-[10px] bg-[black] text-white text-[16px] rounded-full px-[32px] py-[14px] leading-none group hover:text-[#fafafa66]"
                  onClick={() => handleDeleteClick(transaction._id)}
                >
                  <span>
                    <svg
                      className="stroke-current text-white group-hover:text-[#fafafa66]"
                      height={16}
                      width={16}
                    >
                      <use href={`${svg}#trash-icon`}></use>
                    </svg>
                  </span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#0c0d0d99] flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <TransactionForm
            transactionData={currentTransaction}
            type={currentTransaction?.type || transactionsType}
            onSubmit={handleModalClose} // Only close the modal
          />
          <button
            className="absolute top-[11%] left-[43%] text-white"
            onClick={handleModalClose}
          >
            <span className="text-[10px] font-light tracking-widest text-springgreen">
              Click outside or press ESC to close
            </span>
            {/* <svg width={24} height={24}>
              <use href={`${svg}#close-icon`}></use>
            </svg> */}
          </button>
        </div>
      )}
    </div>
  );
};
