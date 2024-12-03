import { createSlice } from '@reduxjs/toolkit';
import { items } from '../../assets/JsonFIles/JSON';

const itemsSlice = createSlice({
  name: 'items',
  initialState: items,
  reducers: {
    addItem: (state, action) => {
      state.push({ id: state.length + 1, ...action.payload });
    },
    updateItem: (state, action) => {
      const { id, newItem } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        state[index] = newItem;
      }
    },
    deleteItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer; 