import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboardSlice';
import favoritesReducer from '../features/favoriteSlice';
import navigationReducer from '../features/navigationSlice'; 
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    favorites: favoritesReducer,
    navigation: navigationReducer,
  },
});