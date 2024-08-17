import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const ButtonLoader = () => {
  return (
    <ThreeDots
      visible={true}
      height="20"
      width="45"
      color="#0c0d0d"
      ariaLabel="three-dots-loading"
    />
  );
};
