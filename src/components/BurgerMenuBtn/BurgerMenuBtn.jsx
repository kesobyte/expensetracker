import React, { useState } from 'react';
import svg from '../../images/icons.svg';
import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';

export const BurgerMenuBtn = () => {
  const [isSideBarOpen, setIsSideBarrOpen] = useState(false);

  const openSideBar = () => {
    setIsSideBarrOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarrOpen(false);
  };

  return (
    <div className="relative z-50">
      <div>
        <button onClick={openSideBar}>
          <svg width={36} height={36}>
            <use href={`${svg}#burger-menu`}></use>
          </svg>
        </button>

        {isSideBarOpen && (
          <div className="absolute">
            <BurgerMenu onClose={closeSideBar} />
          </div>
        )}
      </div>
    </div>
  );
};
