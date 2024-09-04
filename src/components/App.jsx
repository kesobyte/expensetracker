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
    <div className="flex justify-center p-[20px] md:p-0">
      <div>
        <Header />
        <div
          className={`flex ${
            isLoggedIn
              ? 'justify-center mt-[59px]'
              : 'flex-col-reverse mt-[74px] justify-center md:gap-[54px] md:max-xl:flex-col-reverse md:max-xl:pb-[36px] xl:flex-row'
          }`}
        >
          {!isLoggedIn && <SharedLayout />}

          <Routes>
            {/* Restricted routes (accessible only when not logged in) */}
            <Route
              path="/"
              element={
                <RestrictedRoute
                  component={WelcomePage}
                  redirectTo="/transactions/expenses"
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={RegisterPage}
                  redirectTo="/transactions/expenses"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={LoginPage}
                  redirectTo="/transactions/expenses"
                />
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
