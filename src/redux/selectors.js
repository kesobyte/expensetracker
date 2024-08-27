// authSelector
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token; // Access token
export const selectRefreshToken = state => state.auth.refreshToken; // Refresh token
export const selectSid = state => state.auth.sid; // Session ID
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsRefreshing = state => state.auth.isRefreshing;

// userSelector
export const selectUserProfile = state => state.profile.user;
export const selectProfileIsLoading = state => state.profile.isLoading;
export const selectProfileError = state => state.profile.error;
