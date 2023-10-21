import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 isSignedIn: false,
 errorMessage:'',
 succsessMessage:'',
 person:{
    email:"",
    exp:0,
    iat:0,
    nameid:"",
    nbf:0,
    role:'',
    unique_name:'',
 },
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
handleSignIn: (state, action) => {
  state.isSignedIn = true;
},

setErrorMessage: (state, action) => {
  state.errorMessage = action.payload;
},

setSuccsessMessage: (state, action) => {
  state.succsessMessage = action.payload;
},
handleLogIn: (state, action) => {
  state.isSignedIn = true;
  for (let key in action.payload) {
    state.person[key] = action.payload[key];
  }
},
handleLogOut: (state, action) => {
  state.isSignedIn = false;
  localStorage.removeItem('token');
  state.person={
    email:"",
    exp:0,
    iat:0,
    nameid:"",
    nbf:0,
    role:'',
    unique_name:'',
  }
}
  },
});

export const {handleSignIn,setErrorMessage,setSuccsessMessage,handleLogIn,handleLogOut } = user.actions;
export default user.reducer;