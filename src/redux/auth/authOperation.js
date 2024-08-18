import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Provided API
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to delete JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      await axios.post('/auth/register', {
        name,
        email,
        password,
      });
      // Automatically login after registration
      const loginResponse = await thunkAPI.dispatch(login({ email, password }));
      return loginResponse.payload; // Return the login response payload
    } catch (error) {
      const status = error.response.status;
      const message = error.message;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { accessToken, refreshToken, sid, user } = response.data;

      // Store the tokens and set the authorization header
      setAuthHeader(accessToken);
      return { user, accessToken, refreshToken, sid };
    } catch (error) {
      const status = error.response.status;
      const message = error.message;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Refresh Token
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async ({ sid }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedRefreshToken = state.auth.refreshToken;

    if (!persistedRefreshToken) {
      return thunkAPI.rejectWithValue('Unable to refresh token');
    }

    try {
      setAuthHeader(persistedRefreshToken);
      const response = await axios.post('/auth/refresh', { sid });
      const {
        accessToken,
        refreshToken: newRefreshToken,
        sid: newSid,
      } = response.data;
      setAuthHeader(accessToken);
      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Refresh User
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
