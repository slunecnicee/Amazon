import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatest } from "../servises/getLatest";

const initialState = {
  isLoading: true,
  latest: {},
};

export const getRedLatest = createAsyncThunk("products/getlatest", getLatest);

const latestSlice = createSlice({
  name: "latest",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedLatest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.latest = action.payload;
    });
  },
});

export default latestSlice.reducer;
