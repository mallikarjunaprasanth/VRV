const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  darkMode: getInitialTheme(),
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newDarkMode = !state.darkMode;
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      return {
        ...state,
        darkMode: newDarkMode,
      };
    }
    default:
      return state;
  }
};
