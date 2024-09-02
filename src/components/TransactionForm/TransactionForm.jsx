import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../images/icons.svg';
import { CategoriesModal } from 'components/CategoriesModal/CategoriesModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../redux/category/categoryOperation';
import {
  createTransaction,
  updateTransaction,
} from '../../redux/transaction/transactionOperation';
import { selectUser } from '../../redux/user/selectors';
import { selectExchangeRates } from '../../redux/exchangeRate/selectors';

// Currency symbols
const currencySymbols = {
  uah: 'UAH',
  usd: 'USD',
  eur: 'EUR',
};

export const TransactionForm = ({ transactionData, onSubmit, type }) => {
  const [currentDate, setCurrentDate] = useState(transactionData?.date || '');
  const [currentTime, setCurrentTime] = useState(transactionData?.time || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    transactionData?.category?._id || ''
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    transactionData?.category?.categoryName || ''
  );
  const [transactionType, setTransactionType] = useState(type);
  const [sum, setSum] = useState('');
  const [comment, setComment] = useState(transactionData?.comment || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const exchangeRates = useSelector(selectExchangeRates);

  useEffect(() => {
    if (!transactionData) {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      setCurrentDate(date);

      const time = now.toTimeString().split(' ')[0].slice(0, 5);
      setCurrentTime(time);
    }
  }, [transactionData]);

  useEffect(() => {
    if (transactionData) {
      const rate = exchangeRates[user.currency.toUpperCase()] || 1;
      setSum((transactionData.sum * rate).toFixed(2)); // Convert USD sum to the selected currency
    }
  }, [transactionData, user.currency, exchangeRates]);

  const handleTransactionTypeChange = e => {
    const selectedType = e.target.value;
    setTransactionType(selectedType);
    navigate(`/transactions/${selectedType}`); // Update the URL
  };

  const openCategoryModal = () => {
    dispatch(getAllCategories());
    setIsModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsModalOpen(false);
  };

  const handleCategorySelect = category => {
    setSelectedCategoryId(category._id); // Store the ObjectId
    setSelectedCategoryName(category.categoryName); // Store the name
    closeCategoryModal();
  };

  const handleSumChange = e => {
    const value = e.target.value;
    setSum(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const rate = exchangeRates[user.currency.toUpperCase()] || 1;
    const convertedSum = parseFloat(sum) / rate; // Convert sum back to USD

    const transactionPayload = {
      ...transactionData,
      type: transactionType,
      category: selectedCategoryId, // Send the ObjectId
      date: currentDate,
      time: currentTime,
      sum: parseFloat(convertedSum), // Save the sum in USD
      comment,
    };

    if (transactionData?._id) {
      dispatch(
        updateTransaction({ ...transactionPayload, _id: transactionData._id })
      );
    } else {
      dispatch(createTransaction(transactionPayload));
    }

    // Reset form fields after dispatch
    setSelectedCategoryId('');
    setSelectedCategoryName('');
    setSum('');
    setComment('');

    if (onSubmit) onSubmit(transactionPayload); // Call the onSubmit prop if provided
  };

  // Get the user's selected currency symbol
  const currencySymbol = currencySymbols[user.currency] || '$';

  return (
    <div className="flex flex-col gap-[20px] bg-[#171719] rounded-[30px] p-[40px] w-[566px] ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <div className="flex flex-row text-white gap-[20px] items-center">
          <div className="flex items-center">
            <input
              type="radio"
              id="expense"
              name="transaction"
              value="expenses"
              className="appearance-none h-[16px] w-[16px] outline-2 outline-[#fafafa33] outline rounded-full checked:bg-[springgreen] checked:border-[3px] checked:border-[#171719] checked:outline checked:outline-2 checked:outline-[springgreen] ease-in duration-100"
              checked={transactionType === 'expenses'}
              onChange={handleTransactionTypeChange}
              disabled={!!transactionData?._id} // Disable if editing
            />
            <label
              htmlFor="expense"
              className="ml-[8px] text-[16px] tracking-[-0.32px] font-normal"
            >
              Expense
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="income"
              name="transaction"
              value="incomes"
              className="appearance-none h-[16px] w-[16px] outline-2 outline-[#fafafa33] outline rounded-full checked:bg-[springgreen] checked:border-[3px] checked:border-[#171719] checked:outline checked:outline-2 checked:outline-[springgreen] ease-in duration-100"
              checked={transactionType === 'incomes'}
              onChange={handleTransactionTypeChange}
              disabled={!!transactionData?._id} // Disable if editing
            />
            <label
              htmlFor="income"
              className="ml-[8px] text-[16px] tracking-[-0.32px] font-normal"
            >
              Income
            </label>
          </div>
        </div>

        <div className="flex flex-row gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="date"
              className="text-white text-[16px] tracking-[-0.32px] font-normal"
            >
              Date
            </label>
            <div className="relative">
              <input
                value={currentDate}
                type="date"
                className="py-[12px] pl-[18px] pr-[100px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen]"
                onChange={e => setCurrentDate(e.target.value)}
              />
              <svg className="absolute top-[15px] left-[85%]">
                <use href={`${icon}#calendar-icon`} />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="time"
              className="text-white text-[16px] tracking-[-0.32px] font-normal"
            >
              Time
            </label>
            <div className="relative">
              <input
                value={currentTime}
                type="time"
                className="py-[12px] pl-[18px] pr-[130px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen]"
                onChange={e => setCurrentTime(e.target.value)}
              />
              <svg className="absolute top-[15px] left-[85%]">
                <use href={`${icon}#clock-icon`} />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="category"
              className="text-white text-[16px] tracking-[-0.32px] font-normal"
            >
              Category
            </label>
            <input
              onClick={openCategoryModal}
              type="text"
              value={selectedCategoryName} // Display the category name
              className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
              placeholder="Select a category"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="sum"
              className="text-white text-[16px] tracking-[-0.32px] font-normal"
            >
              Sum
            </label>
            <div className="relative">
              <input
                value={sum}
                type="number"
                className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
                placeholder="Enter sum"
                onChange={handleSumChange}
              />
              <span className="absolute top-[15px] left-[85%] text-[16px] text-[#fafafa33]">
                {currencySymbol}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="comment"
            className="text-white text-[16px] tracking-[-0.32px] font-normal"
          >
            Comment
          </label>
          <textarea
            value={comment}
            className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full h-[90px] resize-none"
            placeholder="Enter comment"
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="flex py-[14px] px-[44px] justify-center items-center rounded-[40px] bg-[springgreen] hover:bg-mediumseagreen max-w-[25%] font-normal leading-none"
        >
          {transactionData ? 'Edit' : 'Add'}
        </button>
      </form>

      {isModalOpen && (
        <CategoriesModal
          onClose={closeCategoryModal}
          type={transactionType}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </div>
  );
};
