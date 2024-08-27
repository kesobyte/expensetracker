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
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.get('/user/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update User Profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.patch('/user/profile', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Upload Avatar
export const uploadAvatar = createAsyncThunk(
  'profile/uploadAvatar',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      const response = await axios.post('/user/avatar', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Remove Avatar
export const removeAvatar = createAsyncThunk(
  'profile/removeAvatar',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      setAuthHeader(token);
      await axios.delete('/user/avatar');
      return { avatar: '' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
