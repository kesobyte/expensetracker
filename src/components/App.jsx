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
import { refreshUser } from '../redux/auth/authOperation'; // Assuming refreshUser fetches current user data

export const App = () => {
  const { isLoggedIn, token } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token && !isLoggedIn) {
        await dispatch(refreshUser()); // Dispatch an action to refresh user data
      }
      setIsLoading(false); // Set loading to false after checking auth status
    };

    checkAuthStatus();
  }, [dispatch, token, isLoggedIn]);

  // Show a loading spinner or splash screen while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-[24px]">Waiting Game :P</p>
        {/* You can replace this with a spinner or a more elaborate splash screen */}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto">
        <Header />
        <div
          className={`flex ${
            isLoggedIn
              ? 'justify-center mt-[74px]'
              : 'gap-[54px] justify-center mt-[74px]'
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
                  redirectTo="/transactions"
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={RegisterPage}
                  redirectTo="/transactions"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={LoginPage}
                  redirectTo="/transactions"
                />
              }
            />

            {/* Protected routes (accessible only when logged in) */}
            <Route
              path="/transactions"
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
    </>
  );
};
