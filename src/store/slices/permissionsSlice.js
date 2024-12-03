import { createSlice } from '@reduxjs/toolkit';
import { permissions } from '../../assets/JsonFIles/JSON';

const initialState = {
  permissions: permissions,
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