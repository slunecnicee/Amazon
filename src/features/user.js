import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems } from "../servises/cart/getCartItems";
import { removeCartItem } from "../servises/cart/RemoveFromCart";
import { v4 as uuidv4 } from "uuid";

export const getReduxCartItems = createAsyncThunk("cart/items", getCartItems);

export const removeRedCartItem = createAsyncThunk(
  "cart/remove",
  removeCartItem
);

const initialState = {
  isSignedIn: false,
  errorMessage: "",
  succsessMessage: "",
  addresses: [],
  email: "",
  exp: 0,
  iat: 0,
  nameid: "",
  nbf: 0,
  role: "",
  unique_name: "",
  cartItems: {
    isLoading: true,
    isLoaded: false,
    isError: false,
    data: {},
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSignIn: (state) => {
      state.isSignedIn = true;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    setSuccsessMessage: (state, action) => {
      state.succsessMessage = action.payload;
    },
    handleLogIn: (state, { payload }) => {
      state.isSignedIn = true;
      for (let key in payload) {
        state[key] = payload[key];
      }
    },
    handleLogOut: (state) => {
      state.isSignedIn = false;
      localStorage.removeItem("token");
      state = {
        email: "",
        exp: 0,
        iat: 0,
        nameid: "",
        nbf: 0,
        role: "",
        unique_name: "",
      };
    },
    handleAddProduct: (state, action) => {
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          data: {
            ...state.cartItems.data,
            [action.payload.id]: action.payload,
          },
        },
      };
    },

    handleRemoveOptimisticProduct(state, action) {
      delete state.cartItems.data[action.payload];
    },
    handleSetAddress(state, action) {
      const newAddress = {
        id: uuidv4(),
        ...action.payload,
      };

      const updatedAddresses = [...state.addresses, newAddress];

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

      return {
        ...state,
        addresses: updatedAddresses,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(getReduxCartItems.fulfilled, (state, action) => {
      state.cartItems.isLoaded = true;
      state.cartItems.isLoading = false;
      state.cartItems.isError = false;
      const newObj = {};

      action.payload.forEach((product) => {
        newObj[product.id] = product;
      });

      state.cartItems.data = newObj;
    });
    builder.addCase(removeRedCartItem.fulfilled, (state, { payload }) => {
      if (payload) {
        delete state.cartItems.data[payload];
      }
    });
  },
});

export const {
  handleSignIn,
  setErrorMessage,
  setSuccsessMessage,
  handleLogIn,
  handleLogOut,
  handleRemoveOptimisticProduct,
  handleAddProduct,
  handleSetAddress,
} = user.actions;
export default user.reducer;
