import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
      );
    },
    clearFilter: (state) => {
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { filterProductsByCategory, clearFilter } = productsSlice.actions;

export default productsSlice.reducer;
