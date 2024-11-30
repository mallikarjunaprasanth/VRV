import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: [
    { id: 1, name: 'read', description: 'Can read content' },
    { id: 2, name: 'write', description: 'Can create and edit content' },
    { id: 3, name: 'delete', description: 'Can delete content' },
    { id: 4, name: 'all', description: 'Has all permissions' },
  ],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addPermission: (state, action) => {
      state.permissions.push({ ...action.payload, id: state.permissions.length + 1 });
    },
  },
});

export const { addPermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;