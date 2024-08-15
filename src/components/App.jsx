import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { Header } from './Header/Header';
import { useState } from 'react';

export const App = () => {
  const [isLoggedIn, _setIsLoggedIn] = useState(true);

  return (
    <>
      <div className="mx-auto">
        <div>
          <Header isLoggedIn={isLoggedIn} />
        </div>
        <div className="flex gap-[54px] justify-center mt-[74px]">
          <SharedLayout />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
