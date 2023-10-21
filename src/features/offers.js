import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOffers } from "../servises/getOffers";

const initialState = {
  isLoading: true,
  offers: {},
};

export const getRedOffers = createAsyncThunk("products/getOffers", getOffers);

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.offers = action.payload;
    });
  },
});

export default offersSlice.reducer;
