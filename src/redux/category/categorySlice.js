import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from './categoryOperation';

import { toast } from 'react-toastify';

const initialState = {
  categories: {
    incomes: [],
    expenses: [],
  },
  error: null,
  isLoading: false,
  deletedId: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentId: (state, { payload }) => {
      state.deletedId = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.isLoading = false;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const deletingIncCategory = state.categories?.incomes?.find(
          category => category._id === payload
        );
        const deletingExpCategory = state.categories?.expenses?.find(
          category => category._id === payload
        );

        if (deletingIncCategory) {
          state.categories.incomes = state.categories?.incomes?.filter(
            category => category !== deletingIncCategory
          );
          toast.info('You deleted the category successfully');
        }

        if (deletingExpCategory) {
          state.categories.expenses = state.categories?.expenses?.filter(
            category => category !== deletingExpCategory
          );
          toast.info('You deleted the category successfully');
        }

        state.isLoading = false;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        const addedCategory = state.categories[payload.type]?.find(
          category => category?.categoryName === payload?.categoryName
        );

        if (addedCategory) {
          toast.warning('Category with this name already exists');
          return;
        }

        if (!state.categories) {
          state.categories = {};
        }

        switch (payload.type) {
          case 'incomes':
            if (!state.categories.incomes) {
              state.categories.incomes = [];
            }
            state.categories.incomes.push(payload);
            break;

          case 'expenses':
            if (!state.categories.expenses) {
              state.categories.expenses = [];
            }
            state.categories.expenses.push(payload);
            break;

          default:
            break;
        }

        state.isLoading = false;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const incomeCategory = state.categories?.incomes?.find(
          category => category._id === payload._id
        );
        const expenseCategory = state.categories?.expenses?.find(
          category => category._id === payload._id
        );

        if (incomeCategory) {
          incomeCategory.categoryName = payload.categoryName;
          toast.success('You changed the category successfully');
        }

        if (expenseCategory) {
          expenseCategory.categoryName = payload.categoryName;
          toast.success('You changed the category successfully');
        }
      })
      .addMatcher(
        isAnyOf(
          getAllCategories.pending,
          deleteCategory.pending,
          createCategory.pending,
          updateCategory.pending
        ),
        (state, { payload }) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.rejected,
          deleteCategory.rejected,
          createCategory.rejected,
          updateCategory.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const { setCurrentId } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
