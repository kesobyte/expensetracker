import React from 'react';
import heroImg from '../../images/hero-img.png';
import { DecorationTab } from './DecorationTab/DecorationTab';

export const BgImageWrapper = () => {
  return (
    <div className="relative">
      <img
        className="bg-cover md:min-w-[536px] "
        src={heroImg}
        alt="happy couple having fun in front of laptop"
      />
      <div className="absolute md:top-[310px] md:left-[-50px]">
        <DecorationTab />
      </div>
    </div>
  );
};
