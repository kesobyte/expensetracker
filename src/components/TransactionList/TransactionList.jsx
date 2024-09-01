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

export const TransactionList = ({ transactionsType }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    if (transactionsType) {
      dispatch(getTransactions({ type: transactionsType })); // Fetch based on transactionsType
    }
  }, [dispatch, transactionsType]);

  const handleEditClick = transaction => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

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

  return (
    <div className="p-4">
      {loading && (
        <div className="flex justify-center mt-[5%]">
          <Loader />{' '}
        </div>
      )}

      {error && <p>Error: {error}</p>}
      {!loading && (
        <>
          <div className="bg-gray-800 text-gray-300 rounded-t-lg p-2 flex justify-between items-center">
            <div className="w-1/6">Category</div>
            <div className="w-2/6">Comment</div>
            <div className="w-1/6">Date</div>
            <div className="w-1/6">Time</div>
            <div className="w-1/6">Sum</div>
            <div className="w-1/6">Actions</div>
          </div>
          <div className="bg-gray-900 text-gray-300 rounded-b-lg p-2">
            {transactions.map(transaction => (
              <div
                key={transaction._id}
                className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
              >
                <div className="w-1/6">{transaction.category.categoryName}</div>
                <div className="w-2/6">{transaction.comment}</div>
                <div className="w-1/6">{transaction.date}</div>
                <div className="w-1/6">{transaction.time}</div>
                <div className="w-1/6">{transaction.sum}</div>
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
