import React from 'react';
import tempProfile from '../../images/ethan-valdez.png';
import chevronUp from '../../images/icons.svg';

export const UserBarBtn = () => {
  return (
    <div className="flex justify-center items-center gap-[8px] bg-[#171719] rounded-[30px] px-[16px] py-[6px]">
      <img
        className="w-[44px] h-[44px] rounded-[40px] bg-[#e0e0e0]"
        src={tempProfile}
        alt="temporary profile picture"
      />
      <p className="text-[#fafafa66] text-[16px] font-normal tracking-[-0.32px]">
        Alex Rybachok
      </p>
      <svg className="hover:cursor-pointer" width={20} height={20}>
        <use href={`${chevronUp}#chevron-up`}></use>
      </svg>
    </div>
  );
};
