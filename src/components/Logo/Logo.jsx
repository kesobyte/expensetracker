import React from 'react';
import icon from '../../images/Icon.png';

export const Logo = () => {
  return (
    <div className="flex gap-[8px] items-center">
      <img
        src={icon}
        alt="expense tracker logo"
        className="w-[27px] h-[16px]"
      />
      <p className="text-white text-[21px] font-bold tracking-[-0.4px] uppercase leading-none">
        ExpenseTracker
      </p>
    </div>
  );
};
