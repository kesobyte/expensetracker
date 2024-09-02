import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRate/fetchExchangeRates',
  async (baseCurrency = 'USD') => {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${baseCurrency}`
    );
    const data = await response.json();
    return data.rates;
  }
);
