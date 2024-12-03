import { createSlice } from '@reduxjs/toolkit';
import { roles } from '../../assets/JsonFIles/JSON';

const initialState = {
  roles: roles
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action) => {
      const newRole = {
        id: state.roles.length + 1,
        name: action.payload.name,
        permissions: action.payload.permissions || [],
        roleType: action.payload.name,
        modules: action.payload.modules 
      };
      state.roles.push(newRole);
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