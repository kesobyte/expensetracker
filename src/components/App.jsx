import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Logo } from './Logo/Logo';

export const App = () => {
  return (
    <>
      <div className="flex justify-center mt-[32px]">
        <Logo />
      </div>
      <div className="flex gap-[54px] justify-center m-w-[1440px] mt-[74px]">
        <SharedLayout />
        <WelcomePage />
      </div>
    </>
  );
};
