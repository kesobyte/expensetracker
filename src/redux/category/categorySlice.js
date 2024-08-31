import { createSlice } from '@reduxjs/toolkit';
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
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload || { incomes: [], expenses: [] };
        state.isLoading = false;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Failed to fetch categories');
      })

      .addCase(createCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        const { type, _id, categoryName } = payload;
        state.categories[type].push({ _id, type, categoryName });
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Failed to create category');
      })

      .addCase(updateCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const { _id, categoryName } = payload;

        // Find the category type by looking through both types of categories
        const categoryType = Object.keys(state.categories).find(type =>
          state.categories[type].some(category => category._id === _id)
        );

        if (categoryType) {
          const categoryList = state.categories[categoryType];
          const categoryIndex = categoryList.findIndex(
            category => category._id === _id
          );

          if (categoryIndex >= 0) {
            categoryList[categoryIndex].categoryName = categoryName; // Update the category name
          }
        }

        state.isLoading = false;
      })

      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error('Failed to update category');
      })

      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const { type, id } = payload;
        state.categories[type] = state.categories[type]?.filter(
          category => category._id !== id
        );
        state.isLoading = false;
      })

      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
