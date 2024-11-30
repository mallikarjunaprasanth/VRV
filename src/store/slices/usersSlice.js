import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { 
      id: 1, 
      name: 'Prasanth', 
      email: 'admin@example.com', 
      password: 'admin123', 
      roleId: 1, 
      status: 'active',
      role: 'Admin',
      permission:["all"]
    },
    { 
      id: 2, 
      name: 'Rajesh', 
      email: 'editor@example.com', 
      password: 'editor123',
      roleId: 2, 
      status: 'active',
      role: 'Editor',
      permission:["editor"]
    },
    { 
      id: 3, 
      name: 'Babu', 
      email: 'viewer@example.com', 
      password: 'viewer123',
      roleId: 3, 
      status: 'active',
      role: 'Viewer' ,
      permission:["Viewer"]

    },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: state.users.length + 1 });
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
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;