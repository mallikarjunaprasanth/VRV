import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersReducer from './slices/usersSlice';
import rolesReducer from './slices/rolesSlice';
import permissionsReducer from './slices/permissionsSlice';
import authReducer from './slices/authSlice';
import itemsReducer from './slices/itemsSlice';
import { themeReducer } from './slices/toggleTheme';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'users', 'roles', 'permissions' , 'theme' , 'items']
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  theme: themeReducer,
  items: itemsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };