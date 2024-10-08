import React, { useState, useRef, useEffect } from 'react';
import tempProfile from '../../images/profile-pic.png';
import svg from '../../images/icons.svg';
import { UserPanel } from './UserPanel/UserPanel';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';

export const UserBarBtn = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const user = useSelector(selectUser);

  // Toggle the UserPanel and Chevron Icon
  const togglePanel = () => {
    setIsPanelOpen(prevState => !prevState);
  };

  // Close the panel when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={panelRef}>
      <div
        onClick={togglePanel}
        className="flex justify-center items-center gap-[8px] bg-[#171719] rounded-[30px] px-[16px] py-[6px] cursor-pointer"
      >
        <img
          className="w-[44px] h-[44px] rounded-[40px] bg-[#e0e0e0]"
          src={user.avatarUrl || tempProfile}
          alt="temporary profile"
        />
        <p className="text-[#fafafa66] text-[16px] font-normal tracking-[-0.32px]">
          {user.name}
        </p>
        <svg width={20} height={20}>
          <use
            href={`${svg}${isPanelOpen ? '#chevron-up' : '#chevron-down'}`}
          />
        </svg>
      </div>

      {isPanelOpen && (
        <div className="absolute bottom-[-95px] left-0 animate-fadeIn">
          <UserPanel />
        </div>
      )}
    </div>
  );
};
