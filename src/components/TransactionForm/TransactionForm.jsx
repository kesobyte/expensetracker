import React from 'react';

export const TransactionForm = () => {
  return (
    <form className="bg-[#171719] rounded-[30px] p-[40px] w-[566px] h-full">
      {/* Type */}
      <div className="flex flex-row text-white gap-[20px] items-center">
        <div>
          <input type="radio" id="expense" />
          <label for="expense">Expense</label>
        </div>
        <div>
          <input type="radio" id="income" />
          <label for="income">Income</label>
        </div>
      </div>
      {/* Date & Time */}
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-col">
          <label for="date">Date</label>
          <input type="date" />
        </div>
        <div className="flex flex-col">
          <label for="time">Time</label>
          <input type="time" />
        </div>
      </div>
      <div>
        <div>
          <label for="category">Category</label>
          <input type="text" />
        </div>
        <div>
          <label for="sum">Sum</label>
          <input type="number" />
        </div>
        <div>
          <label for="commet">Comment</label>
          <input type="textarea" />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
