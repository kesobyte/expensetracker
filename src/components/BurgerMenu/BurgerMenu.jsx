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
      className="fixed inset-0 flex justify-end bg-[#0c0d0d99] overflow-hidden z-50 cursor-auto"
      onClick={handleBackdropClick} // Close side on backdrop click
    >
      <div className="bg-springgreen p-[20px] h-full w-full md:w-1/2 animate-slideIn">
        <div className="flex items-center justify-between">
          <UserBarBtn />
          <svg width={20} height={20}>
            <use href={`${svg}#burger-close`} onClick={onClose}></use>
          </svg>
        </div>

        <div className="flex items-center justify-center h-[70vh]">
          <TransactionsHistoryNav onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
