import React from 'react';

const Input = ({ type = 'text', placeholder = '', className = '', ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${className}`}
      {...rest}
    />
  );
};

export default Input; 