import { BgImageWrapper } from 'components/BgImageWrapper/BgImageWrapper';
import React from 'react';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <>
      <div className={css.container}>
        <BgImageWrapper />
      </div>
    </>
  );
};
