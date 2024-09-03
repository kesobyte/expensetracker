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
import { Loader } from 'components/Loader/Loader';

export const CategoriesModal = ({ onClose, type, onSelectCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);

  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
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
      toast.error('Category name cannot be empty');
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
      <div className="relative bg-[#171719] rounded-[30px] py-[40px] w-[500px] h-[461px] border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[20px]">
          <button onClick={onClose}>
            <svg width={24} height={24} className="cursor-pointer">
              <use href={`${svg}#close-icon`} />
            </svg>
          </button>
        </div>
        <h2 className="text-white text-[28px] px-[40px] leading-none">
          {typeLabels[type] || 'Unknown Type'}
        </h2>
        <div className="mt-[20px] mr-[8px]">
          <span className="text-[12px] text-[#fafafa66] px-[40px]">
            All Category
          </span>
        </div>

        {/* Categories List */}
        <div className="max-h-[200px] h-full w-full overflow-y-auto mt-[8px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : (
            <ul>
              {categories[type]?.map(category => (
                <li
                  key={category._id}
                  className="flex justify-between items-center text-white hover:bg-[#00000033] py-[10px] px-[40px]"
                  onMouseEnter={() => setHoveredCategoryId(category._id)} // Set hovered item
                  onMouseLeave={() => setHoveredCategoryId(null)} // Reset hover state
                >
                  <span>{category.categoryName}</span>
                  {hoveredCategoryId === category._id && ( // Conditionally render buttons
                    <div className="flex gap-[14px]">
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
        </div>
        <div className="flex flex-col mt-[30px] px-[40px]">
          <h2 className="text-[16px] text-springgreen leading-none">
            New Category
          </h2>
          <form className="mt-[8px]" onSubmit={handleAddOrEditCategory}>
            <input
              type="text"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              placeholder="Enter the text"
              className="relative w-full py-[12px] px-[18px] rounded-[12px] border-[#fafafa33] border bg-transparent placeholder:text-[#fafafa33] text-white text-[16px] focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-[40px] bottom-[38.5px] py-[15px] px-[44px] leading-none rounded-[12px] bg-[springgreen] hover:bg-mediumseagreen text-black text-[16px]"
            >
              {editingCategoryId ? 'Edit' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
