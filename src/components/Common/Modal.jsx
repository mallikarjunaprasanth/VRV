import PropTypes from 'prop-types';
import { themeColors } from '../../styles/theme';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30 "  onClick={onClose}></div>
        <div className={`
          relative p-6 w-full max-w-lg rounded-lg shadow-xl
          ${themeColors.background.secondary}
          ${themeColors.border.primary}
        `}>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

