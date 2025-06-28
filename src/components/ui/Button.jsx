import React from 'react';

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary',
  type = 'button',
  disabled = false,
  ...rest 
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };
  
  // Size classes
  const sizeClasses = 'px-4 py-2 text-sm';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${disabledClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button; 