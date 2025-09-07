import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeItem: { id: 'default', title: 'Default', iconName: 'FiPieChart' },
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navigationSlice.actions;

export default navigationSlice.reducer;