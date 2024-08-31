import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Set base URL
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Create Category
export const createCategory = createAsyncThunk(
  'createCategory',
  async (category, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      setAuthHeader(token);
      const response = await axios.post('categories', category);
      return response.data; // Ensure the API returns the full category object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch All Categories
export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  'updateCategory',
  async ({ id, categoryName }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`categories/${id}`, { categoryName });
      return data; // Return the updated category object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async ({ id, type }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      setAuthHeader(token);
      await axios.delete(`categories/${id}`);
      return { id, type };
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return thunkAPI.rejectWithValue(
          'Can`t remove! Some transactions depend on this category'
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
