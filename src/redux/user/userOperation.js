// profileOperations.js
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
  'users/fetchUser',
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
  'users/updateUser',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.patch('/users/info', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Upload Avatar
export const uploadAvatar = createAsyncThunk(
  'users/uploadAvatar',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.post('/users/avatar', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Remove Avatar
export const removeAvatar = createAsyncThunk(
  'users/removeAvatar',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      await axios.delete('/users/avatar');
      return { avatar: '' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
