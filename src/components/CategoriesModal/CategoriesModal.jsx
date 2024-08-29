import React from 'react';
import svg from '../../images/icons.svg';

export const CategoriesModal = ({ onClose, type }) => {
  // Handle backdrop click to close the modal
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0c0d0d99] z-50 cursor-auto animate-fadeIn"
      onClick={handleBackdropClick} // Close modal on backdrop click
    >
      {/* Modal */}
      <div className="relative bg-[#171719] rounded-[30px] p-[40px] w-[500px] h-[266px] border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[-250px]">
          <button onClick={onClose}>
            <svg className="cursor-pointer">
              <use href={`${svg}#close-icon `} />
            </svg>
          </button>
        </div>
        <h3 className="text-white">{type}</h3>
      </div>
    </div>
  );
};
