import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  updateUser,
  changeAvatar,
  removeAvatar,
} from './userOperation';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      // Handle Fetching Current User
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle Update User
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

      // Handle Change Avatar
      .addCase(changeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        // state.user.avatar = action.payload.avatar;
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

      // Handle removing avatar
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
