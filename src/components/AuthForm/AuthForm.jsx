import React, { useState } from 'react';
import iconSvg from '../../images/icons.svg';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../redux/auth/authOperation';

export const AuthForm = ({
  fields,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  isLogin, // To determine if for /login or /register
}) => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Password Show Toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form Data for Login or Register
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Asynchronous Form Submission
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await dispatch(login(formData)).unwrap();
      } else {
        await dispatch(register(formData)).unwrap();
      }
      // Handle post-submission logic, e.g., redirecting or clearing the form
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[24px]">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <input
                className="w-[399px] inline-flex py-3 pr-[44px] px-4 items-center gap-[10px] rounded-xl border border-[#fafafa33] bg-transparent text-white text-[16px] leading-[24px] font-normal hover:border-[springgreen] placeholder:text-[#fafafa66] ease-in duration-200 focus:outline-none focus:border-springgreen focus:ring-1 focus:ring-springgreen"
                type={
                  field.type === 'password' && showPassword
                    ? 'text'
                    : field.type
                }
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={e => handleChange(e, field.name)}
                id={field.name}
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="flex justify-center items-center gap-[10px] px-[44px] py-[14px] rounded-[40px] bg-springgreen text-black text-[16px] font-normal tracking-[-0.32px] hover:bg-mediumseagreen mt-[60px] ease-in duration-200"
        >
          {buttonText}
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
