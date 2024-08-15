import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Logo } from './Logo/Logo';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';

export const App = () => {
  return (
    <>
      <div className="flex justify-center mt-[32px]">
        <Logo />
      </div>
      <div className="flex gap-[54px] justify-center m-w-[1440px] mt-[74px]">
        <SharedLayout />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
};
