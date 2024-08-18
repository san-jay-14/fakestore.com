// src/store/slices/cartSlice.ts
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      console.log("Payload:", action.payload);
      console.log("Current State Before Adding:", current(state));

      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        // Item exists in the cart, so increment the quantity
        state.items[itemIndex].quantity += 1;
      } else {
        // Item doesn't exist in the cart, so add it with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      console.log("Current State After Adding:", current(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
export type { CartItem };
