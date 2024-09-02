import { createSlice } from '@reduxjs/toolkit';
import { fetchExchangeRates } from './exchangeRateOperation';

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState: {
    rates: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExchangeRates.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const exchangeRateReducer = exchangeRateSlice.reducer;
