import { createSlice } from '@reduxjs/toolkit';

import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from './transactionOperation.js';

import { toast } from 'react-toastify';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTransaction.pending, state => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload?.type === 'expenses') {
          state.transactions.push(action.payload);
        }
        toast.success('Transaction added');
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Oops, something went wrong, try again later');
      })
      .addCase(getTransactions.pending, state => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTransaction.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const transactionId = action?.payload;

        state.transactions = state.transactions?.filter(
          transaction => transaction._id !== transactionId
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTransaction.pending, state => {
        state.loading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const itemIndex = state.transactions.findIndex(
          item => item._id === action.payload._id
        );
        if (itemIndex !== -1) {
          state.loading = false;
          state.transactions?.splice(itemIndex, 1, action.payload);
        }
        toast.success('Transaction updated');
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
