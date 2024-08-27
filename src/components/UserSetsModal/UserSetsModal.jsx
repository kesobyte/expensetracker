import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfile,
  uploadAvatar,
  removeAvatar,
} from '../../redux/profile/profileOperation';
import {
  selectUserProfile,
  selectProfileIsLoading,
  selectProfileError,
} from '../../redux/selectors';

export const UserSetsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectProfileIsLoading);
  const error = useSelector(selectProfileError);

  const [formData, setFormData] = useState(profile || {});
  const [avatar, setAvatar] = useState(null);

  // Ensure formData is updated when the profile changes
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = e => {
    setAvatar(e.target.files[0]);
  };

  const handleUploadAvatar = () => {
    const avatarData = new FormData();
    avatarData.append('avatar', avatar);
    dispatch(uploadAvatar(avatarData)).then(() => {
      setAvatar(null); // Reset avatar after uploading
    });
  };

  const handleRemoveAvatar = () => {
    dispatch(removeAvatar());
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProfile(formData)).then(() => {
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#0C0D0D] rounded-[30px] p-[40px] w-[400px]">
        <div className="flex justify-between items-center mb-[20px]">
          <h2 className="text-white text-[24px]">Profile settings</h2>
          <button onClick={onClose} className="text-white text-[24px]">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-[20px]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={formData.avatarUrl || '/default-avatar.png'}
                alt="User Avatar"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              <button
                type="button"
                onClick={handleUploadAvatar}
                disabled={isLoading || !avatar}
                className="bg-[springgreen] text-white px-[10px] py-[5px] rounded"
              >
                {isLoading ? 'Uploading...' : 'Upload new photo'}
              </button>
              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={isLoading}
                className="bg-red-500 text-white px-[10px] py-[5px] rounded"
              >
                {isLoading ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-[5px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="py-[10px] px-[15px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="currency" className="text-white mb-[5px]">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency || 'USD'}
              onChange={handleInputChange}
              className="py-[10px] px-[15px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[springgreen] text-white py-[10px] rounded-[12px] mt-[20px]"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          {error && <div className="text-red-500 mt-[10px]">{error}</div>}
        </form>
      </div>
    </div>
  );
};
