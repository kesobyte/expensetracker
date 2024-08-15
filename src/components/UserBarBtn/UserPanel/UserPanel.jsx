import React from 'react';
import svg from '../../../images/icons.svg';

export const UserPanel = () => {
  return (
    <>
      <div className="w-[212px] h-[86px] rounded-[15px] border-solid border-[1px] border-[#fafafa1a] bg-[#0C0D0D] px-[16px] py-[18px] flex flex-col justify-center gap-[12px]">
        <div className="flex items-center gap-[12px] group hover:cursor-pointer">
          <svg
            height={16}
            width={16}
            className="stroke-current text-[#fafafa80] group-hover:text-springgreen"
          >
            <use href={`${svg}#user-icon`}></use>
          </svg>
          <p className="text-[#fafafa80] text-[16px] font-normal leading-normal group-hover:text-white">
            Profile settings
          </p>
        </div>
        <div className="flex items-center gap-[12px] group hover:cursor-pointer">
          <svg
            height={16}
            width={16}
            className="stroke-current text-[#fafafa80] group-hover:text-springgreen"
          >
            <use href={`${svg}#logout-icon`}></use>
          </svg>
          <p className="text-[#fafafa80] text-[16px] font-normal leading-normal group-hover:text-white">
            Log out
          </p>
        </div>
      </div>
    </>
  );
};
