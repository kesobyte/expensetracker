import { Header } from 'components/Header/Header';
import { BgImageWrapper } from 'components/BgImageWrapper/BgImageWrapper';
import React from 'react';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <div className={css.container}>
        <BgImageWrapper />
      </div>
    </>
  );
};
