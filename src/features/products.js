import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../servises/getProducts";
const initialState = {
  isLoading: true,
  products: [],
};

export const getRedProducts = createAsyncThunk(
  "products/getProducts",
  getProducts
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getRedProducts.pending, (state, action) => {
      state.isLoading = true;
      state.products = [];
    });
  },
});

export default productSlice.reducer;
