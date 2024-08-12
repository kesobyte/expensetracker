import React from 'react';
import css from './Welcome.module.css';
import '../../index.css';
import fleur from '../../images/fleur-cook.png';
import ethan from '../../images/ethan-valdez.png';
import amanda from '../../images/amanda-lowery.png';

export const WelcomePage = () => {
  return (
    <div className={css.container}>
      <div>
        <div>
          <p className={css.textTop}>EXPENSE LOG</p>
          <h1 className={css.textHeader}>
            Manage Your <span>Finances</span> Masterfully!
          </h1>
          <p className={css.textDesc}>
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
        </div>
        <div className={css.buttons}>
          <button className={css.btnSignUp}>Sign Up</button>
          <button className={css.btnSignIn}>Sign In</button>
        </div>
      </div>
      <div className={css.bottomInfo}>
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
        <div className={css.totalUsers}>
          <h2 className={css.textUsers}>1000 users +</h2>
          <p className={css.textBottom}>
            Trusted by users for reliable expense tracking!
          </p>
        </div>
      </div>
    </div>
  );
};
