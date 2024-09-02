import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { userReducer } from './user/userSlice';
import { categoriesReducer } from './category/categorySlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filterReducer } from './filter/filterSlice';
import { transactionReducer } from './transaction/transactionSlice';
import { exchangeRateReducer } from './exchangeRate/exchangeRateSlice';

// Persisting relevant fields from auth slice to local storage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'refreshToken', 'sid', 'user'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    categories: categoriesReducer,
    filter: filterReducer,
    transaction: transactionReducer,
    exchangeRate: exchangeRateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
