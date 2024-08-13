import React from 'react';
import css from './AllUsersTab.module.css';
import fleur from '../../images/fleur-cook.png';
import ethan from '../../images/ethan-valdez.png';
import amanda from '../../images/amanda-lowery.png';

export const AllUsersTab = () => {
  return (
    <div>
      <div className={css.avatars}>
        <img
          className={css.fleur}
          src={fleur}
          width="48"
          height="48"
          alt="fleur cook"
        />
        <img
          className={css.ethan}
          src={ethan}
          width="48"
          height="48"
          alt="ethan valdez"
        />
        <img
          className={css.amanda}
          src={amanda}
          width="48"
          height="48"
          alt="amanda lowery"
        />
      </div>
      <div className="ml-[155px]">
        <h2 className="text-white text-[28px] font-normal tracking=[-0.56px] leading-none">
          1000 users +
        </h2>
        <p className="max-w-[210px] text-[#fafafa66] text-[16px] font-light tracking-[-0.32px] mt-[12px]">
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  );
};
