import { baseAPI } from "./baseApi";

export const userSignIn = (loginObj) =>
  baseAPI.post("/api/User/LogIn", loginObj);
