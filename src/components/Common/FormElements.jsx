import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const FormElements=({ 
  elementType = "input",  
  type = "text",         
  placeholder = "",
  value = "",
  onChange,
  onClick,
  disabled = false,
  variant = "primary",   
  className = "",
  children,
  options = [],          
  error = ""
}) =>{
  const baseInputStyles = "border p-2 rounded focus:ring-2 focus:ring-blue-500 w-full";
  const baseButtonStyles = "px-4 py-2 rounded transition-colors w-full";
  const errorStyles = "border-red-500 focus:ring-red-500";
  
  const buttonVariants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600"
  };

  const [showPassword, setShowPassword] = React.useState(false);

  switch (elementType) {
    
    case 'input':
      return (
        <div className="flex flex-col w-full">
          <div className="relative">
            <input
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`${baseInputStyles} ${error ? errorStyles : ''} ${className} ${
                type === 'password' ? 'pr-10' : ''
              }`}
              disabled={disabled}
            />
            {type === 'password' && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            )}
          </div>
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
      );

    case 'button':
      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`
            ${baseButtonStyles} 
            ${buttonVariants[variant]} 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
            ${className}
          `}
        >
          {children}
        </button>
      );

    case 'select':
    
      return (
        <div className="flex flex-col w-full">
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseInputStyles} ${error ? errorStyles : ''} ${className}`}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
      );

    default:
      return null;
  }
}

FormElements.propTypes = {
  elementType: PropTypes.oneOf(['input', 'button', 'select']),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'warning']),
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  error: PropTypes.string
};
