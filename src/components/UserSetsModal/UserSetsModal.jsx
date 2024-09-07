import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  changeAvatar,
  removeAvatar,
} from '../../redux/user/userOperation';
import { selectUser, selectUserIsLoading } from '../../redux/user/selectors';
import profilePic from '../../images/profile-pic.png';
import svg from '../../images/icons.svg';
import { toast } from 'react-toastify';
import { ButtonLoader } from 'components/ButtonLoader/ButtonLoader';

export const UserSetsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState(user);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSelectFocus = () => {
    setIsOptionOpen(true);
  };

  const handleSelectBlur = () => {
    setIsOptionOpen(false);
  };

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

  // Handle Avatar Upload
  const handleUploadAvatar = () => {
    setIsUploading(true); // Set uploading state
    if (selectedFile) {
      dispatch(changeAvatar(selectedFile))
        .unwrap()
        .then(() => {
          toast.success('Avatar has been updated successfully!');
          setSelectedFile(null);
          setIsUploading(false);
          onClose();
        })
        .catch(e => {
          toast.error('Something went wrong! Try to upload a smaller photo');
          setIsUploading(false);
        });
    }
  };

  const handleRemoveAvatar = () => {
    setIsRemoving(true); // Set removing state
    if (user._id) {
      dispatch(removeAvatar(user._id))
        .unwrap()
        .then(() => {
          toast.success('Avatar has been removed');
          setIsRemoving(false);
          onClose();
        })
        .catch(e => {
          toast.error('Something went wrong! Try again');
          setIsRemoving(false);
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
      className="fixed inset-0 flex items-center justify-center bg-[#0c0d0d99] z-50 cursor-auto animate-fadeIn p-[20px] md:p-0"
      onClick={handleBackdropClick} // Close modal on backdrop click
    >
      {/* Modal */}
      <div className="relative bg-[#171719] rounded-[30px] p-[40px] w-[500px] border border-[#fafafa1a]">
        <div className="absolute top-[20px] right-[-250px]">
          <button onClick={onClose}>
            <svg className="cursor-pointer">
              <use href={`${svg}#close-icon `} />
            </svg>
          </button>
        </div>
        <div className="flex items-center mb-[40px]">
          <h2 className="text-white text-[28px] tracking-[-0.56px] leading-none">
            Profile settings
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <input
              id="changeAvatar"
              type="file"
              ref={inputRef}
              accept="image/*"
              disabled={isLoading}
              className="hidden"
              onChange={handleFileChange}
            />
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : formData.avatarUrl || profilePic
              }
              alt="User Avatar"
              className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
              onClick={handleImageClick}
            />
            {/* Avatar Buttons */}
            <div className="flex gap-[8px] mt-[20px]">
              <button
                type="button"
                onClick={handleUploadAvatar}
                disabled={!selectedFile || isUploading}
                className={`bg-[#29292B] text-white text-[12px] px-[16px] py-[8px] rounded-[40px]  ${
                  !selectedFile || isLoading ? 'opacity-50 cursor-default' : ''
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload new photo'}
              </button>
              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={isRemoving}
                className="bg-[#29292B] text-white text-[12px] px-[16px] py-[8px] rounded-[40px]"
              >
                {isRemoving ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="flex gap-[8px] mt-[40px]">
            <div className="relative">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
                className="py-[12px] pl-[18px] pr-[56px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white appearance-none"
              >
                <option value="usd" className="bg-black text-white">
                  $ USD
                </option>
                <option value="uah" className="bg-black text-white">
                  ₴ UAH
                </option>
                <option value="eur" className="bg-black text-white">
                  € EUR
                </option>
              </select>
              <svg
                width={20}
                height={20}
                className="absolute right-[16px] top-[50%] transform translate-y-[-50%] pointer-events-none"
              >
                <use
                  href={`${svg}${
                    isOptionOpen ? '#chevron-up' : '#chevron-down'
                  }`}
                />
              </svg>
            </div>

            <div className="w-full">
              <input
                className="py-[12px] px-[15px] rounded-[12px] border-[#fafafa33] border bg-transparent text-white w-full"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full h-[47px] justify-center items-center bg-[springgreen] text-black py-[10px] rounded-[40px] mt-[20px]"
          >
            {isLoading ? <ButtonLoader color="#000" /> : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};
