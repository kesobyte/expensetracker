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
import { selectLoading } from '../../redux/transaction/selectors';
import { selectUser } from '../../redux/user/selectors';
import { selectExchangeRates } from '../../redux/exchangeRate/selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Ensure this import is included
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
// import { toast } from 'react-toastify';

// Currency symbols
const currencySymbols = {
  uah: 'UAH',
  usd: 'USD',
  eur: 'EUR',
};

export const TransactionForm = ({ transactionData, onSubmit, type }) => {
  const [currentDate, setCurrentDate] = useState(
    transactionData?.date ? new Date(transactionData.date) : new Date()
  );
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
  const isLoading = useSelector(selectLoading);
  const exchangeRates = useSelector(selectExchangeRates);

  useEffect(() => {
    if (!transactionData) {
      const now = new Date();
      setCurrentDate(now);
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
      date: currentDate.toISOString().split('T')[0], // Convert date to string
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
    <div className="relative flex flex-col gap-[20px] bg-[#171719] rounded-[30px] p-[20px] md:px-[80px] md:py-[40px] xl:p-[40px] xl:w-[566px] xl:h-[622px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <div className="flex flex-row text-white gap-[20px] items-center">
          <div className="flex items-center group hover:cursor-pointer">
            <input
              type="radio"
              id="expense"
              name="transaction"
              value="expenses"
              className="appearance-none h-[16px] w-[16px] outline-2 outline-[#fafafa33] outline rounded-full checked:bg-[springgreen] checked:border-[3px] checked:border-[#171719] checked:outline checked:outline-2 checked:outline-[springgreen] ease-in duration-100 group-hover:cursor-pointer"
              checked={transactionType === 'expenses'}
              onChange={handleTransactionTypeChange}
              disabled={!!transactionData?._id} // Disable if editing
            />
            <label
              htmlFor="expense"
              className="ml-[8px] text-[16px] tracking-[-0.32px] font-normal group-hover:cursor-pointer"
            >
              Expense
            </label>
          </div>
          <div className="flex items-center group hover:cursor-pointer">
            <input
              type="radio"
              id="income"
              name="transaction"
              value="incomes"
              className="appearance-none h-[16px] w-[16px] outline-2 outline-[#fafafa33] outline rounded-full checked:bg-[springgreen] checked:border-[3px] checked:border-[#171719] checked:outline checked:outline-2 checked:outline-[springgreen] ease-in duration-100 group-hover:cursor-pointer"
              checked={transactionType === 'incomes'}
              onChange={handleTransactionTypeChange}
              disabled={!!transactionData?._id} // Disable if editing
            />
            <label
              htmlFor="income"
              className="ml-[8px] text-[16px] tracking-[-0.32px] font-normal group-hover:cursor-pointer"
            >
              Income
            </label>
          </div>
        </div>

        {/* Data & Time */}
        <div className="flex flex-row gap-[20px] w-full">
          {/* Date Input */}
          <div className="flex flex-col gap-[8px] w-1/2">
            <label
              htmlFor="date"
              className="text-white text-[16px] tracking-[-0.32px] font-normal"
            >
              Date
            </label>
            <div className="relative w-full">
              <DatePicker
                selected={currentDate}
                onChange={date => setCurrentDate(date)}
                className="py-[12px] pl-[14px] w-full pr-[3rem] rounded-[12px] border-[#fafafa33] border bg-transparent text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] text-[14px] md:text-[16px]"
                wrapperClassName="w-full"
              />
              <svg
                width={20}
                height={20}
                className="absolute top-[50%] transform -translate-y-1/2 right-[14px]"
              >
                <use href={`${icon}#calendar-icon`} />
              </svg>
            </div>
          </div>
          {/* Time Input */}
          <div className="flex flex-col gap-[8px] w-1/2">
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
                className="py-[12px] pl-[14px] w-full pr-[3rem] rounded-[12px] border-[#fafafa33] border bg-transparent text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] text-[14px] md:text-[16px]"
                onChange={e => setCurrentTime(e.target.value)}
              />
              <svg
                width={20}
                height={20}
                className="absolute top-[50%] transform -translate-y-1/2 right-[14px]"
              >
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
              className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] text-[14px] md:text-[16px] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
              placeholder="Select a category"
              readOnly
              disabled={!!transactionData?._id} // Disable if editing
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
                className="py-[12px] px-[18px] rounded-[12px] text-[14px] md:text-[16px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
                placeholder="Enter sum"
                onChange={handleSumChange}
              />
              <span className="absolute top-[50%] transform -translate-y-1/2 right-[14px] text-[16px] text-[#fafafa33]">
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
            className="py-[12px] px-[18px] rounded-[12px] text-[14px] md:text-[16px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full h-[90px] resize-none"
            placeholder="Enter comment"
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex py-[14px] px-[44px] justify-center items-center rounded-[40px] bg-[springgreen] hover:bg-mediumseagreen h-[47px] w-[115px] font-normal leading-none"
          >
            {isLoading ? (
              <div className="leading-none">
                <ButtonLoader color="#000" />
              </div>
            ) : transactionData ? (
              'Save'
            ) : (
              'Add'
            )}
          </button>
        </div>
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
