import React from 'react';
import heroImg from '../../images/hero-img.png';
import css from './BgImageWrapper.module.css';
import { DecorationTab } from './DecorationTab/DecorationTab';

export const BgImageWrapper = () => {
  return (
    <>
      <div className={css.heroImgContainer}>
        <img
          className={css.heroImg}
          src={heroImg}
          alt="happy couple having fun in front of laptop"
        />
        <div className={css.decorationTab}>
          <DecorationTab />
        </div>
      </div>
    </>
  );
};
