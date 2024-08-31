import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../redux/category/categoryOperation';
import {
  selectCategories,
  selectIsLoading,
} from '../../redux/category/selectors';
import svg from '../../images/icons.svg';
import { toast } from 'react-toastify';

export const CategoriesModal = ({ onClose, type, onSelectCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);

  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null); // Manage hover state

  const typeLabels = {
    expenses: 'Expenses',
    incomes: 'Incomes',
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditCategory = category => {
    setCategoryName(category.categoryName);
    setEditingCategoryId(category._id);
  };

  // Handle Add & Edit
  const handleAddOrEditCategory = async e => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setErrorMessage('Category name cannot be empty');
      return;
    }

    try {
      if (editingCategoryId) {
        await dispatch(
          updateCategory({ id: editingCategoryId, categoryName })
        ).unwrap();
        toast.success('Category updated successfully');
      } else {
        await dispatch(createCategory({ categoryName, type })).unwrap();
        toast.success('Category has been created');
      }
      setCategoryName('');
      setEditingCategoryId(null);
    } catch (error) {
      console.error('Failed to add or edit category:', error);
      toast.error('Failed to update or create category');
    }
  };

  // Handle Delete
  const handleDeleteCategory = async id => {
    try {
      await dispatch(deleteCategory({ id, type })).unwrap();
      toast.success('Category deleted successfully');
    } catch (error) {
      if (error === 'Can`t remove! Some transactions depend on this category') {
        toast.warning(error);
        return;
      }
    }
  };

  const handleCategorySelect = category => {
    onSelectCategory(category);
    onClose();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#0c0d0d99] z-50 cursor-auto animate-fadeIn"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative bg-[#171719] rounded-[30px] p-[40px] w-[500px] h-auto border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[20px]">
          <button onClick={onClose}>
            <svg width={24} height={24} className="cursor-pointer">
              <use href={`${svg}#close-icon`} />
            </svg>
          </button>
        </div>
        <h3 className="text-white">{typeLabels[type] || 'Unknown Type'}</h3>
        {isLoading ? (
          <p className="text-white text-center my-10">Loading...</p>
        ) : (
          <ul className="my-4 max-h-[200px] overflow-y-auto">
            {categories[type]?.map(category => (
              <li
                key={category._id}
                className="flex justify-between items-center text-white"
                onMouseEnter={() => setHoveredCategoryId(category._id)} // Set hovered item
                onMouseLeave={() => setHoveredCategoryId(null)} // Reset hover state
              >
                <span>{category.categoryName}</span>
                {hoveredCategoryId === category._id && ( // Conditionally render buttons
                  <div className="flex gap-2">
                    <button onClick={() => handleCategorySelect(category)}>
                      <svg className="cursor-pointer" width={16} height={16}>
                        <use href={`${svg}#select-icon`} />
                      </svg>
                    </button>
                    <button onClick={() => handleEditCategory(category)}>
                      <svg className="cursor-pointer" width={16} height={16}>
                        <use href={`${svg}#edit-icon`} />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <svg className="cursor-pointer" width={16} height={16}>
                        <use href={`${svg}#delete-icon`} />
                      </svg>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddOrEditCategory} className="flex flex-col mt-4">
          <input
            type="text"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            placeholder="Enter the text"
            className="flex-grow py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white focus:outline-none"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="ml-4 py-[12px] px-[24px] mt-4 rounded-[12px] bg-[springgreen] hover:bg-mediumseagreen text-white"
          >
            {editingCategoryId ? 'Edit' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};
