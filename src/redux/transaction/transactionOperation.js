import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentUser } from '../user/userOperation';

// Set base URL
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

// // Utility to add JWT
// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const createTransaction = createAsyncThunk(
  'createTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const { data } = await axios.post('transactions', transactionData);
      // Dispatch fetchCurrentUser after successful transaction creation
      thunkAPI.dispatch(fetchCurrentUser());
      return data;
    } catch (error) {
      console.error('Error Response:', error.response.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async ({ type, startDate }, { rejectWithValue }) => {
    try {
      const query = startDate
        ? `?date=${startDate.year}-${startDate.month}-${startDate.day}`
        : '';
      const response = await axios.get(`/transactions/${type}${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`transactions/${id}`);
      // Dispatch fetchCurrentUser after successful transaction deletion
      thunkAPI.dispatch(fetchCurrentUser());

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
      // Dispatch fetchCurrentUser after successful transaction update
      thunkAPI.dispatch(fetchCurrentUser());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
