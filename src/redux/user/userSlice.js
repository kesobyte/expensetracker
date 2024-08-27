import { createSlice } from '@reduxjs/toolkit';
// prettier-ignore
import { fetchCurrentUser, updateUser, uploadAvatar, removeAvatar,} from './userOperation';

const initialState = {
  user: { name: '', email: '', avatar: '', currency: '' },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder => {
    builder
      // Handle fetching profile
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

      // Handle updating profile
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

      // Handle uploading avatar
      .addCase(uploadAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.avatar;
        state.isLoading = false;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle removing avatar
      .addCase(removeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeAvatar.fulfilled, state => {
        state.user.avatar = '';
        state.isLoading = false;
      })
      .addCase(removeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
