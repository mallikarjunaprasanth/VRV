import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [
    { id: 1, name: 'Admin', permissions: ['all'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
  ],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.roles.push({ ...action.payload, id: state.roles.length + 1 });
    },
    updateRole: (state, action) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
  },
});

export const { addRole, updateRole, deleteRole } = rolesSlice.actions;
export default rolesSlice.reducer;