import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './store/index';
import './App.css';
import { Layout } from './Layout/Layout';
import { useSelector } from 'react-redux';
import { themeColors } from './styles/theme';


// Create a separate component for the dark mode logic
function AppContent() {
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={`min-h-screen ${themeColors.background.primary} ${themeColors.text.primary}`}>
          <AppContent />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;