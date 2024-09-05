import React from 'react';
import { UserBarBtn } from 'components/UserBarBtn/UserBarBtn';
import { TransactionsHistoryNav } from 'components/TransactionsHistoryNav/TransactionsHistoryNav';
import svg from '../../images/icons.svg';

export const BurgerMenu = ({ onClose }) => {
  // Handle backdrop click to close the modal
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0c0d0d99] z-50 cursor-auto animate-fadeIn"
      onClick={handleBackdropClick} // Close side on backdrop click
    >
      <div className="bg-springgreen p-[20px] h-full w-full">
        <div className="flex items-center justify-between">
          <UserBarBtn />
          <svg width={20} height={20}>
            <use href={`${svg}#burger-close`} onClick={onClose}></use>
          </svg>
        </div>

        <div>
          <TransactionsHistoryNav />
        </div>
      </div>
    </div>
  );
};
