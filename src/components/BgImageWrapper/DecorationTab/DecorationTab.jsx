import React from 'react';
import css from './DecorationTab.module.css';
import arrowUp from '../../../images/icons.svg';

export const DecorationTab = () => {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.icon}>
          <svg width="15" height="17">
            <use href={`${arrowUp}#arrow-up`} />
          </svg>
        </div>

        <div className={css.elementWrapper}>
          <p className={css.textBalance}>Your balance</p>
          <div className={css.textWrapper}>
            <p className={css.textAmount}>$632.000</p>
            <div className={css.percentWrapper}>
              <p className={css.percentNum}>+1.29%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
