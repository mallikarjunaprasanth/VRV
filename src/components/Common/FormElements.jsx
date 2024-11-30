import React from 'react';

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
  const baseInputStyles = "border p-2 rounded focus:ring-2 focus:ring-blue-500";
  const baseButtonStyles = "px-4 py-2 rounded transition-colors";
  const errorStyles = "border-red-500 focus:ring-red-500";
  
  const buttonVariants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600"
  };
  console.log("options",options ,elementType)
  switch (elementType) {
    
    case 'input':
      return (
        <div className="flex flex-col">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseInputStyles} ${error ? errorStyles : ''} ${className}`}
            disabled={disabled}
          />
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
        <div className="flex flex-col">
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
