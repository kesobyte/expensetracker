export const selectTransactions = state => state.transaction.transactions;
export const selectExpenses = state => state.transaction.expenses;
export const selectLoading = state => state.transaction.loading;
export const selectError = state => state.transaction.error;
export const selectTotalAmounts = state => state.transaction.totalAmounts;
