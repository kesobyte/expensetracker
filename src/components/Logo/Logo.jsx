import React from 'react';
import icon from '../../images/Icon.png';
import css from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={css.logo}>
      <img src={icon} alt="expense tracker logo" className={css.icon} />
      <p className={css.logoText}>ExpenseTracker</p>
    </div>
  );
};
