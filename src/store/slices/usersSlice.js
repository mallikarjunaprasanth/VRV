import { createSlice } from '@reduxjs/toolkit';
import { loginUsers } from '../../assets/JsonFIles/JSON';

const initialState = {
  users: loginUsers
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: state.users.length + 1 , disabled: false});
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUserRole: (state, action) => {
      const { userId, roleId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.roles = [roleId]; // or update roles array as needed
      }
    },
  },
});

export const { addUser, updateUser, deleteUser, updateUserRole } = usersSlice.actions;
export default usersSlice.reducer;