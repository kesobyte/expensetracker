import React from 'react';

export const TransactionForm = () => {
  return (
    <form className="bg-[#171719] rounded-[30px] p-[40px] w-[566px] h-full">
      {/* Type */}
      <div className="flex flex-row text-white gap-[20px] items-center">
        <div className="flex items-center">
          <input
            type="radio"
            id="expense"
            name="transaction"
            className="appearance-none h-[16px] w-[16px] outline-2 outline-[#fafafa33] rounded-full checked:bg-[springgreen]  checked:border-solid checked:outline checked:outline-2 checked:outline-[springgreen]"
          />
          <label
            htmlFor="expense"
            className="ml-[8px] text-[16px] leading-[24px] font-medium"
          >
            Expense
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="income"
            name="transaction"
            className="appearance-none h-[16px] w-[16px] border-2 border-[#444] rounded-full checked:bg-[#444] checked:border-[#444] focus:outline-none"
          />
          <label
            htmlFor="income"
            className="ml-[8px] text-[16px] leading-[24px] font-medium"
          >
            Income
          </label>
        </div>
      </div>
      {/* Date & Time */}
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col">
          <label htmlFor="date">Date</label>
          <input type="date" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="time">Time</label>
          <input type="time" />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="sum">Sum</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="commet">Comment</label>
          <input type="textarea" />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
