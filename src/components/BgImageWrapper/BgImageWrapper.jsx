import React from 'react';
import heroImg from '../../images/hero-img.png';
import { DecorationTab } from './DecorationTab/DecorationTab';

export const BgImageWrapper = () => {
  return (
    <div className="relative">
      <img
        className="md:min-w-[611px] bg-cover"
        src={heroImg}
        alt="happy couple having fun in front of laptop"
      />
      <div className="absolute top-[180px] left-[-10px]  md:top-[310px] md:left-[-50px]">
        <DecorationTab />
      </div>
    </div>
  );
};
