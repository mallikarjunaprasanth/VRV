import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BackIcon = ({ nav = -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(nav)}
      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
      type="button"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-7 w-7 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="text-lg font-medium">Back</span>
    </button>
  );
}; 

BackIcon.propTypes = {
  nav: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}; 