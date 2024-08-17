import React from 'react';
import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="70"
      width="70"
      color="var(--springgreen)"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      strokeWidth="5"
    />
  );
};
