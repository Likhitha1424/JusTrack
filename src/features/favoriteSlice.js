import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Start with a couple of default favorites for demonstration
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
      const item = action.payload; // e.g., { id: 'ecommerce', title: 'eCommerce', iconName: 'FiShoppingCart' }
      const existingIndex = state.items.findIndex((fav) => fav.id === item.id);

      if (existingIndex >= 0) {
        // If it exists, remove it (unfavorite)
        state.items.splice(existingIndex, 1);
      } else {
        // If it doesn't exist, add it (favorite)
        state.items.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;