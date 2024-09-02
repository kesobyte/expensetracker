import React from 'react';
import svg from '../../images/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authOperation';
import { ButtonLoader } from 'components/ButtonLoader/ButtonLoader';
import { selectIsLoading } from '../../redux/auth/selectors';

export default function LogoutPrompt({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

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
      <div className="relative flex flex-col justify-center items-center bg-[#171719] rounded-[30px] p-[40px] w-[500px] h-[266px] border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[-250px]">
          <button onClick={onClose}>
            <svg className="cursor-pointer">
              <use href={`${svg}#close-icon `} />
            </svg>
          </button>
        </div>

        <p className="text-white">Are you sure you want to log out?</p>

        <div className="flex flex-row gap-[8px] mt-[40px]">
          <button
            onClick={() => dispatch(logout())}
            disabled={isLoading}
            className="flex justify-center items-center bg-[springgreen] text-black py-[14px] px-[44px] rounded-[40px] hover:bg-[--mediumseagreen]"
          >
            {isLoading ? <ButtonLoader /> : 'Logout'}
          </button>
          <button
            onClick={onClose}
            className="flex justify-center items-center bg-[#29292b] text-white py-[14px] px-[44px] rounded-[40px] hover:text-[#fafafa80]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
