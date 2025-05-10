// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import compareReducer from './compareSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
  },
});