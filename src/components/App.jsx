import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { MainTransactionsPage } from 'pages/MainTransactionsPage/MainTransactionsPage';
import { Header } from './Header/Header';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { useAuth } from 'hooks/useAuth';
import { refreshToken } from '../redux/auth/authOperation';
import { fetchCurrentUser } from '../redux/user/userOperation'; // Import fetchCurrentUser
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { TransactionHistoryPage } from 'pages/TransactionHistoryPage/TransactionHistoryPage';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchExchangeRates } from '../redux/exchangeRate/exchangeRateOperation';

export const App = () => {
  const { isLoggedIn, token, sid } = useAuth(); // Ensure `sid` is destructured here
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // useEffect(() => {
  //   dispatch(fetchExchangeRates()); // Fetch exchange rates when the app loads
  // }, [dispatch]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token && !isLoggedIn) {
        await dispatch(refreshToken({ sid })).unwrap();
      }

      if (isLoggedIn) {
        // Fetch the current user data if logged in
        await dispatch(fetchCurrentUser());
      }

      setIsLoading(false); // Set loading to false after checking auth status
    };

    checkAuthStatus();
  }, [dispatch, token, isLoggedIn, sid]);

  // Show a loading spinner or splash screen while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-[20px] pb-[20px] xl:p-0">
      <div className="w-full">
        <Header />
        <div
          className={`flex ${
            isLoggedIn
              ? 'flex justify-center mt-[59px]'
              : 'flex justify-center items-center mt-[60px] md:mt-[74px]'
          }`}
        >
          {!isLoggedIn}
          <Routes>
            {/* Restricted routes (accessible only when not logged in) */}
            <Route
              path="/"
              element={
                <div className="flex justify-center flex-col-reverse xl:flex-row gap-[40px] xl:gap-[54px]">
                  <div>
                    <SharedLayout />
                  </div>
                  <RestrictedRoute
                    component={WelcomePage}
                    redirectTo="/transactions/expenses"
                  />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="flex xl:gap-[54px]">
                  <div className="hidden xl:block">
                    <SharedLayout />
                  </div>
                  <RestrictedRoute
                    component={RegisterPage}
                    redirectTo="/transactions/expenses"
                  />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="flex xl:gap-[54px]">
                  <div className="hidden xl:block">
                    <SharedLayout />
                  </div>
                  <RestrictedRoute
                    component={LoginPage}
                    redirectTo="/transactions/expenses"
                  />
                </div>
              }
            />

            {/* Protected routes (accessible only when logged in) */}
            <Route
              path="/transactions/:transactionsType"
              element={
                <ProtectedRoute
                  component={MainTransactionsPage}
                  redirectTo="/"
                />
              }
            />
            <Route
              path="/transactions/history/:transactionsType"
              element={
                <ProtectedRoute
                  component={TransactionHistoryPage}
                  redirectTo="/"
                />
              }
            />

            {/* Routing for non-existent pages */}
            <Route
              path="/*"
              element={
                <ProtectedRoute
                  component={MainTransactionsPage}
                  redirectTo="/"
                />
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
