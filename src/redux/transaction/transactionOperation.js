import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Set base URL
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const createTransaction = createAsyncThunk(
  'createTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const { data } = await axios.post('transactions', transactionData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  'getTransactions',
  async ({ type, date }, thunkAPI) => {
    try {
      const { data } = await axios.get(`transactions/${type}`, {
        params: { date },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`transactions/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'updateTransaction',
  async ({ type, _id, ...transaction }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `transactions/${type}/${_id}`,
        transaction
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
