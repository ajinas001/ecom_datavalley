import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const persistedCart = localStorage.getItem('cart');
    if (persistedCart) {
      return JSON.parse(persistedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
  };
};

// Save cart to localStorage
const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

// Initial state from localStorage or default
const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { item, isUpdate } = action.payload;
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        if (isUpdate) {
          // Replace the quantity completely
          state.items[existingItemIndex].quantity = item.quantity;
        } else {
          // Add to the existing quantity
          state.items[existingItemIndex].quantity += item.quantity;
        }
      } else {
        // Item doesn't exist, add new item
        state.items.push(item);
      }
      
      // Recalculate totals
      let totalQuantity = 0;
      let totalAmount = 0;
      
      state.items.forEach(item => {
        totalQuantity += item.quantity;
        totalAmount += item.price * item.quantity;
      });
      
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      
      // Save to localStorage
      saveCartToStorage(state);
    },
    
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && item.size === size)
      );
      
      // Recalculate totals
      let totalQuantity = 0;
      let totalAmount = 0;
      
      state.items.forEach(item => {
        totalQuantity += item.quantity;
        totalAmount += item.price * item.quantity;
      });
      
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      
      // Save to localStorage
      saveCartToStorage(state);
    },
    
    updateCartItemQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === id && item.size === size
      );
      
      if (itemIndex !== -1) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
        } else {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        }
        
        // Recalculate totals
        let totalQuantity = 0;
        let totalAmount = 0;
        
        state.items.forEach(item => {
          totalQuantity += item.quantity;
          totalAmount += item.price * item.quantity;
        });
        
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
        
        // Save to localStorage
        saveCartToStorage(state);
      }
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Clear localStorage
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;