// userOperations.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Set base URL
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Fetch User Profile
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update User Profile
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const { name, currency } = userData;
      const updatePayload = { name, currency };

      const response = await axios.patch('/users/info', updatePayload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Upload Avatar
export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (avatarFile, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const { data } = await axios.patch('users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Remove Avatar
export const removeAvatar = createAsyncThunk(
  'user/removeAvatar',
  async (avatarId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const { data } = await axios.delete(`users/avatar/${avatarId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
