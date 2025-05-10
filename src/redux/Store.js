// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import compareReducer from './CompareSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    compare: compareReducer,
  },
});