import React from 'react';
import iconSvg from '../../../images/icons.svg';

export const DecorationTab = () => {
  return (
    <>
      <div className="bg-[#fafafa] w-[303px] h-[121px] flex-shrink-0 rounded-[20px] flex justify-center items-center gap-[22px]">
        <div className="w-[43px] h-[43px] flex-shrink-0 bg-springgreen rounded-[13px] flex items-center justify-center">
          <svg width="15" height="17">
            <use href={`${iconSvg}#arrow-up`} />
          </svg>
        </div>

        <div className="flex flex-col gap-[7px]">
          <p className="text-[#11101c80] text-[16px] font-normal">
            Your balance
          </p>
          <div className="flex items-center gap-[22px]">
            <p className="text-[#11101c] text-[24px] font-bold">$632.000</p>
            <div className="w-[58px] h-[22px] flex-shrink-0 rounded-[13px] bg-[rgba(2,177,90,0.15)] flex justify-center items-center">
              <p className="text-[#02b15a] text-[12px] font-normal">+1.29%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
