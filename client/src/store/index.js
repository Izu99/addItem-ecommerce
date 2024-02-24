// store.js
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/itemSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;
