import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../servises/getCategories";

const initialState = {
  isLoading: true,
  categories: [],
};

export const getRedCategories = createAsyncThunk(
  "products/getCategories",
  getCategories
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
