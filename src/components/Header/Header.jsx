import React from 'react';
import { Logo } from 'components/Logo/Logo';
import css from './Header.module.css';

export const Header = () => {
  return (
    <div className={css.logo}>
      <Logo className={css.logo} />
    </div>
  );
};
