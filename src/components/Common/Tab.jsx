import PropTypes from 'prop-types';
import { themeColors } from '../../styles/theme';

export function Tab({ tabs, activeTab, onTabChange }) {
  return (
    <div className={`border-b ${themeColors.border.primary}`}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.value
                ? `border-indigo-500 ${themeColors.text.primary}`
                : `border-transparent ${themeColors.text.secondary} hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300`
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}; 