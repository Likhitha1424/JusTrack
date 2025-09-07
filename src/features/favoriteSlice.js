import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  items: [
    { id: 'overview', title: 'Overview', iconName: 'FiPieChart' },
    { id: 'projects', title: 'Projects', iconName: 'FiFolder' },
  ],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const existingIndex = state.items.findIndex((fav) => fav.id === item.id);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;