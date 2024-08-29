import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  changeAvatar,
  removeAvatar,
} from '../../redux/user/userOperation';
import { selectUser, selectUserIsLoading } from '../../redux/user/selectors';
import profilePic from '../../images/profile-pic.png';
import { toast } from 'react-toastify';

export const UserSetsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  // Function to handle keydown event
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Add event listener for keydown when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Handle input changes for text fields
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file selection when the image is clicked
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Store the selected file when a new file is chosen
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle the actual upload when the button is clicked
  const handleUploadAvatar = () => {
    if (selectedFile) {
      dispatch(changeAvatar(selectedFile))
        .unwrap()
        .then(() => {
          toast.success('Avatar has been updated successfully!');
          setSelectedFile(null);
          onClose();
        })
        .catch(e => {
          toast.error('Something went wrong! Try to upload a smaller photo');
        });
    }
  };

  // Remove avatar and update the form UI immediately
  const handleRemoveAvatar = () => {
    if (user._id) {
      // Dispatch the Redux action to remove the avatar in the backend
      dispatch(removeAvatar(user._id))
        .unwrap()
        .then(() => {
          // Update the user state to remove the avatar URL
          setFormData(prevState => ({
            ...prevState,
            avatarUrl: null,
          }));
          toast.success('Avatar has been removed');
          onClose();
        })
        .catch(e => {
          toast.error('Something went wrong! Try again');
        });
    }
  };

  // Submit updated user data
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!');
        onClose(); // Close the modal after successful submission
      })
      .catch(error => {
        toast.error('Profile update failed. Please try again.');
      });
  };

  // Handle backdrop click to close the modal
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
      onClick={handleBackdropClick} // Close modal on backdrop click
    >
      {/* Modal */}
      <div className="bg-[#171719] rounded-[30px] p-[40px] w-[500px]">
        <div className="flex items-center mb-[40px]">
          <h2 className="text-white text-[28px] tracking-[-0.56px] leading-none">
            Profile settings
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-[20px]">
          <div className="flex flex-col items-center">
            <div className="relative">
              <input
                id="changeAvatar"
                type="file"
                ref={inputRef}
                accept="image/*"
                disabled={isLoading}
                className="hidden"
                onChange={handleFileChange} // Handle file selection
              />
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : formData.avatarUrl || profilePic
                }
                alt="User Avatar"
                className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
                onClick={handleImageClick} // Open file explorer on image click
              />
            </div>
            <div className="flex gap-[10px] mt-[10px]">
              <button
                type="button"
                onClick={handleUploadAvatar} // Trigger upload only when clicked
                disabled={!selectedFile || isLoading} // Disable if no file selected or loading
                className={`bg-[springgreen] text-white px-[10px] py-[5px] rounded cursor-pointer ${
                  !selectedFile || isLoading ? 'opacity-50' : ''
                }`}
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
              value={formData.name}
              onChange={handleInputChange}
              className="py-[10px] px-[15px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="currency" className="text-white mb-[5px]">
              Currency
            </label>
            <div className="relative">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="py-[10px] px-[15px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white"
              >
                <option value="uah">₴ UAH</option>
                <option value="usd">$ USD</option>
                <option value="eur">€ EUR</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[springgreen] text-white py-[10px] rounded-[12px] mt-[20px]"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};
