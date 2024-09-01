import { createSlice } from '@reduxjs/toolkit';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from './transactionOperation.js';

import { toast } from 'react-toastify';

const initialState = {
  transactions: [], // Array to store transactions
  loading: false, // Loading state
  error: null, // Error state
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
        state.transactions.push(action.payload); // Add new transaction to the array
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
        state.transactions = action.payload; // Set the fetched transactions
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
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.payload
        ); // Remove the deleted transaction
        toast.success('Transaction deleted');
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Failed to delete transaction');
      })
      .addCase(updateTransaction.pending, state => {
        state.loading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          transaction => transaction._id === action.payload._id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload; // Update the transaction in the array
        }
        state.loading = false;
        toast.success('Transaction updated');
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Failed to update transaction');
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
