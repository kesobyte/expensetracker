// authSelector
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectToken = state => state.auth.token; // Access token
export const selectRefreshToken = state => state.auth.refreshToken; // Refresh token
export const selectSid = state => state.auth.sid; // Session ID
export const selectIsLoading = state => state.auth.isLoading;
