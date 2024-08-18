// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./app/slices/cartslice";
import productsReducer from "./app/slices/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
