import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMostDemanded } from "../servises/getMostDemanded";

const initialState = {
  isLoading: true,
  demanded: {},
};

export const getRedDemanded = createAsyncThunk(
  "products/getDemanded",
  getMostDemanded
);

const demandedSlice = createSlice({
  name: "demanded",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getRedDemanded.fulfilled, (state, action) => {
      state.isLoading = false;
      state.demanded = action.payload;
    });
  },
});

export default demandedSlice.reducer;
