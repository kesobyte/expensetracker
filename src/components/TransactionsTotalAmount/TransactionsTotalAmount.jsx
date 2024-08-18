import React from 'react';
import iconSvg from '../../images/icons.svg';

export const TransactionsTotalAmount = () => {
  return (
    <div className="flex gap-[24px]">
      <div className="bg-[#171719] w-[303px] h-[121px] flex-shrink-0 rounded-[30px] flex items-center gap-[22px]">
        <div className="ml-[23px] w-[43px] h-[43px] flex-shrink-0 bg-springgreen rounded-[13px] flex items-center justify-center">
          <svg width="15" height="17">
            <use href={`${iconSvg}#arrow-up`} />
          </svg>
        </div>

        <div className="flex flex-col gap-[7px]">
          <p className="text-[#fafafa80] text-[16px] font-normal">
            Total Income
          </p>
          <div className="flex items-center">
            <p className="text-[#fafafa] text-[24px] font-bold">$10,532.00</p>
          </div>
        </div>
      </div>

      <div className="bg-[#171719] w-[303px] h-[121px] flex-shrink-0 rounded-[30px] flex items-center gap-[22px]">
        <div className="ml-[23px] w-[43px] h-[43px] flex-shrink-0 bg-springgreen rounded-[13px] flex items-center justify-center">
          <svg width="15" height="17">
            <use href={`${iconSvg}#arrow-down`} />
          </svg>
        </div>

        <div className="flex flex-col gap-[7px]">
          <p className="text-[#fafafa80] text-[16px] font-normal">
            Total Expense
          </p>
          <div className="flex items-center">
            <p className="text-[#fafafa] text-[24px] font-bold">$12,242.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};
