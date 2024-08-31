import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../images/icons.svg';
import { CategoriesModal } from 'components/CategoriesModal/CategoriesModal';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../../redux/category/categoryOperation';

export const TransactionForm = ({ type }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionType, setTransactionType] = useState(type);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    setCurrentDate(date);

    const time = now.toTimeString().split(' ')[0].slice(0, 5);
    setCurrentTime(time);
  }, []);

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
    setSelectedCategory(category.categoryName);
    closeCategoryModal();
  };

  return (
    <div className="flex flex-col gap-[20px] bg-[#171719] rounded-[30px] p-[40px] w-[566px] h-full">
      {/* Form */}
      <form className="flex flex-col gap-[20px]">
        {/* Type */}
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
            />
            <label
              htmlFor="income"
              className="ml-[8px] text-[16px] tracking-[-0.32px] font-normal"
            >
              Income
            </label>
          </div>
        </div>

        {/* Date & Time */}
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
                onClick={e => e.currentTarget.showPicker()}
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
                onClick={e => e.currentTarget.showPicker()}
                onChange={e => setCurrentTime(e.target.value)}
              />
              <svg className="absolute top-[15px] left-[85%]">
                <use href={`${icon}#clock-icon`} />
              </svg>
            </div>
          </div>
        </div>

        {/* Category and Sum */}
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
              value={selectedCategory} // Display the selected category
              className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white  hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
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
                type="number"
                className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white  hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full"
                placeholder="Enter sum"
              />
              <span className="absolute top-[15px] left-[85%] text-[16px] text-[#fafafa33]">
                USD
              </span>
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="comment"
            className="text-white text-[16px] tracking-[-0.32px] font-normal"
          >
            Comment
          </label>
          <textarea
            className="py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white hover:border-[springgreen] ease-in duration-200 focus:outline-none focus:border-[springgreen] w-full h-[90px] resize-none"
            placeholder="Enter comment"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex py-[14px] px-[44px] justify-center items-center rounded-[40px] bg-[springgreen] hover:bg-mediumseagreen max-w-[25%] font-normal leading-none"
        >
          Add
        </button>
      </form>

      {/* Modal for Categories */}
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
