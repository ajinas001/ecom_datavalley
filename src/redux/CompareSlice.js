
import { createSlice } from '@reduxjs/toolkit';

// Load items from localStorage if available
const loadCompareItems = () => {
  try {
    const persistedItems = localStorage.getItem('compareItems');
    return persistedItems ? JSON.parse(persistedItems) : [];
  } catch (error) {
    console.error('Failed to load compare items from localStorage:', error);
    return [];
  }
};

const initialState = {
  items: loadCompareItems() // Initialize from localStorage
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      // Check if product already exists
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
        // Save to localStorage
        localStorage.setItem('compareItems', JSON.stringify(state.items));
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Update localStorage
      localStorage.setItem('compareItems', JSON.stringify(state.items));
    },
    clearCompare: (state) => {
      state.items = [];
      // Clear localStorage
      localStorage.removeItem('compareItems');
    }
  }
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;