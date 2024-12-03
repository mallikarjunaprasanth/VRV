import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select';

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
  error = "",
  label = "",
  checked = false,
  name = "",
  isMulti = false,
  ...props
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

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: error ? '#ef4444' : base.borderColor,
      boxShadow: state.isFocused ? '0 0 0 2px rgb(59 130 246 / 0.5)' : 'none',
      '&:hover': {
        borderColor: error ? '#ef4444' : base.borderColor,
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
          ? '#bfdbfe' 
          : base.backgroundColor,
      color: state.isSelected ? 'white' : 'black',
      '&:active': {
        backgroundColor: '#3b82f6',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e5e7eb',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#374151',
      padding: '2px 6px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#374151',
      ':hover': {
        backgroundColor: '#d1d5db',
        color: '#1f2937',
      },
    }),
  };

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
      if (isMulti) {
        return (
          <div className="flex flex-col w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Select
              isMulti
              value={options.filter(option => value.includes(option.value))}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                onChange(selectedValues);
              }}
              options={options}
              isDisabled={disabled}
              className={className}
              styles={customSelectStyles}
              placeholder={placeholder || 'Select options...'}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          </div>
        );
      }
      return (
        <div className="flex flex-col w-full">
          {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
          <Select
            value={value ? options.find(option => option.value === value) : null}
            onChange={(selectedOption) => onChange({ target: { value: selectedOption.value } })}
            options={options}
            isDisabled={disabled}
            className={className}
            styles={customSelectStyles}
            placeholder={placeholder || 'Select an option...'}
          />
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${className}`}
            name={name}
          />
          {label && (
            <label className="text-sm text-gray-700">{label}</label>
          )}
        </div>
      );

    case 'radio':
      return (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`w-4 h-4 text-blue-600 focus:ring-blue-500 ${className}`}
            name={name}
            value={value}
          />
          {label && (
            <label className="text-sm text-gray-700">{label}</label>
          )}
        </div>
      );

    case 'multiSelect':
      return (
        <div className="form-control">
          {label && <label className="label">{label}</label>}
          <select
            multiple
            value={value}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              onChange(selectedOptions);
            }}
            className="select select-bordered w-full"
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
  error: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  isMulti: PropTypes.bool,
};
