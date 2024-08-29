import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../../redux/category/categoryOperation';
import {
  selectCategories,
  selectIsLoading,
} from '../../redux/category/selectors';
import svg from '../../images/icons.svg';

export const CategoriesModal = ({ onClose, type, onSelectCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);

  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const typeLabels = {
    expenses: 'Expenses',
    incomes: 'Incomes',
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddCategory = () => {
    if (editingCategoryId) {
      dispatch(updateCategory({ id: editingCategoryId, categoryName }));
    } else {
      dispatch(createCategory({ categoryName, type }));
    }
    setCategoryName('');
    setEditingCategoryId(null);
  };

  const handleEditCategory = category => {
    setCategoryName(category.categoryName);
    setEditingCategoryId(category._id);
  };

  const handleDeleteCategory = id => {
    dispatch(deleteCategory(id));
  };

  const handleCategorySelect = category => {
    onSelectCategory(category); // Pass the selected category back to the parent component
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0c0d0d99] z-50 cursor-auto animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-[#171719] rounded-[30px] p-[40px] w-[500px] h-auto border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[-250px]">
          <button onClick={onClose}>
            <svg className="cursor-pointer">
              <use href={`${svg}#close-icon`} />
            </svg>
          </button>
        </div>
        <h3 className="text-white">{typeLabels[type] || 'Unknown Type'}</h3>
        <ul className="my-4 max-h-[200px] overflow-y-auto">
          {categories[type]?.map(category => (
            <li
              key={category._id}
              className="flex justify-between items-center text-white"
              onClick={() => handleCategorySelect(category)} // Handle the category selection
            >
              <span>{category.categoryName}</span>
              <div>
                <button onClick={() => handleEditCategory(category)}>
                  <svg className="cursor-pointer" width={16} height={16}>
                    <use href={`${svg}#edit-icon`} />
                  </svg>
                </button>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  <svg className="cursor-pointer" width={16} height={16}>
                    <use href={`${svg}#delete-icon`} />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex mt-4">
          <input
            type="text"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            placeholder="Enter the text"
            className="flex-grow py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white focus:outline-none"
          />
          <button
            onClick={handleAddCategory}
            className="ml-4 py-[12px] px-[24px] rounded-[12px] bg-[springgreen] hover:bg-mediumseagreen text-white"
          >
            {editingCategoryId ? 'Edit' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
