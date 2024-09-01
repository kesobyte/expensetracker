import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  updateUser,
  changeAvatar,
  removeAvatar,
} from './userOperation';

const initialState = {
  user: {
    transactionsTotal: {
      incomes: 0,
      expenses: 0,
    },
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
          transactionsTotal: action.payload.transactionsTotal || {
            incomes: 0,
            expenses: 0,
          },
        };
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          avatarUrl: action.payload?.avatarUrl,
        };
        state.isLoading = false;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeAvatar.fulfilled, state => {
        state.user.avatarUrl = null;
        state.isLoading = false;
      })
      .addCase(removeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
