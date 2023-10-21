import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import categoryReducer from "../features/categories";
import offersReducer from "../features/offers";
import latestReducer from "../features/latest";
import productsSlice from "../features/products";
import demandedSlice from "../features/mostdemanded";

const store = configureStore({
  reducer: {
    demanded: demandedSlice,
    products: productsSlice,
    latest: latestReducer,
    offers: offersReducer,
    categories: categoryReducer,
    user: userReducer,
  },
});

export default store;
