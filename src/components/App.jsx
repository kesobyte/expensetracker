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
import { Loader } from './Loader/Loader';

export const App = () => {
  const { isLoggedIn, token, sid } = useAuth(); // Ensure `sid` is destructured here
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token && !isLoggedIn) {
        await dispatch(refreshToken({ sid })).unwrap();
      }
      setIsLoading(false); // Set loading to false after checking auth status
    };

    checkAuthStatus();
  }, [dispatch, token, isLoggedIn, sid]); // Include `sid` in the dependency array

  // Show a loading spinner or splash screen while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
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
              ? 'justify-center mt-[59px]'
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
    </>
  );
};