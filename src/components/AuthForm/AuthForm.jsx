import React, { useState } from 'react';
import iconSvg from '../../images/icons.svg';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../redux/auth/authOperation';
import { useAuth } from 'hooks/useAuth';
import { ButtonLoader } from 'components/ButtonLoader/ButtonLoader';

export const AuthForm = ({
  fields,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  isLogin, // To determine if for /login or /register
}) => {
  const { isLoading } = useAuth();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [isValidPassword, setIsValidPassword] = useState(null);

  // Handle Password Validation
  const validatePassword = (e, field) => {
    if (field === 'password') {
      const isValid = e.target.value.length >= 8;
      setIsValidPassword(isValid);
      setError(null);
    }
  };

  // Form Data for Login or Register
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
    validatePassword(e, field);
  };

  // Password Show Toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Submit using Async
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setIsValidPassword(null);

    if (!isValidPassword) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      if (isLogin) {
        await dispatch(login(formData)).unwrap();
      } else {
        await dispatch(register(formData)).unwrap();
      }
    } catch (err) {
      if (err.status === 409) {
        setError('Account already exists');
      } else if (err.status === 403) {
        setError('Email address does not exist or the password is incorrect');
      }
      clearPasswordField();
    }
  };

  // Function to clear the password field in the formData
  const clearPasswordField = () => {
    setFormData(prevData => ({
      ...prevData,
      password: '',
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[24px]">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <input
                className={`w-[399px] inline-flex py-3 pr-[44px] px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent text-white text-[16px] leading-[24px] font-normal hover:border-[springgreen] placeholder:text-[#fafafa66] ease-in duration-200 focus:outline-none ${
                  field.type === 'password'
                    ? isValidPassword === null
                      ? 'focus:border-springgreen'
                      : isValidPassword
                      ? 'focus:border-springgreen'
                      : 'focus:border-red-500'
                    : 'focus:border-springgreen'
                } `}
                type={
                  field.type === 'password' && showPassword
                    ? 'text'
                    : field.type
                }
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={e => handleChange(e, field.name)}
                id={field.name}
                required
              />
              {field.type === 'password' && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-[190px] top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <svg width="20" height="20">
                      <use href={`${iconSvg}#show-eye`} />
                    </svg>
                  ) : (
                    <svg width="20" height="20">
                      <use href={`${iconSvg}#close-eye`} />
                    </svg>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="absolute mt-2">
          {isValidPassword !== null && !isLogin && (
            <p
              className={`text-[10px] ml-[18px] ${
                isValidPassword ? 'text-springgreen' : 'text-red-500'
              }`}
            >
              {isValidPassword
                ? 'Password is secure'
                : 'Enter a valid Password'}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-[10px] ml-[18px]">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen mt-[60px] ease-in duration-200 max-w-[145px] w-[100%] max-h-[47px]"
        >
          {isLoading ? <ButtonLoader /> : buttonText}
        </button>
        <div className="text-[12px] font-normal leading-[-18px] mt-[20px]">
          <p className="text-[#fafafa60]">
            {footerText}{' '}
            <a
              href={footerLink}
              className="text-white underline cursor-pointer"
            >
              {footerLinkText}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  footerText: PropTypes.string.isRequired,
  footerLink: PropTypes.string.isRequired,
  footerLinkText: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
};
