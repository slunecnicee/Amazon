import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../servises/getProducts";
const initialState = {
  isLoaded: false,
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
  },
});

export default productSlice.reducer;
