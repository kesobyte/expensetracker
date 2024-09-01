export const selectUser = state => state.user.user;
export const selectUserIsLoading = state => state.user.isLoading;
export const selectUserError = state => state.user.error;
export const selectTransactionsTotal = state =>
  state.user.user.transactionsTotal || { incomes: 0, expenses: 0 };
