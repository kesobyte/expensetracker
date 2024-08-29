import React, { useState, useRef } from 'react';
import svg from '../../../images/icons.svg';
import { UserSetsModal } from 'components/UserSetsModal/UserSetsModal';
import LogoutPrompt from 'components/LogoutPrompt/LogoutPrompt';

export const UserPanel = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const openLogoutPrompt = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutPrompt = () => {
    setIsLogoutModalOpen(false);
  };

  const openProfileSettings = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileSettings = () => {
    setIsProfileModalOpen(false);
    profileButtonRef.current?.focus();
  };

  return (
    <>
      <div className="w-[212px] h-[86px] rounded-[15px] border-solid border-[1px] border-[#fafafa1a] bg-[#0C0D0D] px-[16px] py-[18px] flex flex-col justify-center gap-[12px]">
        <div
          className="flex items-center gap-[12px] group hover:cursor-pointer"
          onClick={openProfileSettings}
          ref={profileButtonRef}
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
          onClick={openLogoutPrompt}
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
      {isProfileModalOpen && <UserSetsModal onClose={closeProfileSettings} />}
      {/* Render the LogoutPrompt when isModalOpen is true */}
      {isLogoutModalOpen && <LogoutPrompt onClose={closeLogoutPrompt} />}
    </>
  );
};
