import React, { useState } from 'react';
import svg from '../../../images/icons.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/authOperation';
import { UserSetsModal } from 'components/UserSetsModal/UserSetsModal';

export const UserPanel = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const openProfileSettings = () => {
    setIsModalOpen(true);
  };

  const closeProfileSettings = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-[212px] h-[86px] rounded-[15px] border-solid border-[1px] border-[#fafafa1a] bg-[#0C0D0D] px-[16px] py-[18px] flex flex-col justify-center gap-[12px]">
        <div
          className="flex items-center gap-[12px] group hover:cursor-pointer"
          onClick={openProfileSettings}
        >
          <svg
            height={16}
            width={16}
            className="stroke-current text-[#fafafa80] group-hover:text-springgreen"
          >
            <use href={`${svg}#user-icon`} />
          </svg>
          <p className="text-[#fafafa80] text-[16px] font-normal leading-normal group-hover:text-white">
            Profile settings
          </p>
        </div>
        <div
          className="flex items-center gap-[12px] group hover:cursor-pointer"
          onClick={handleLogout}
        >
          <svg
            height={16}
            width={16}
            className="stroke-current text-[#fafafa80] group-hover:text-springgreen"
          >
            <use href={`${svg}#logout-icon`} />
          </svg>
          <p className="text-[#fafafa80] text-[16px] font-normal leading-normal group-hover:text-white">
            Log out
          </p>
        </div>
      </div>

      {/* Render the UserSetsModal when isModalOpen is true */}
      {isModalOpen && <UserSetsModal onClose={closeProfileSettings} />}
    </>
  );
};
