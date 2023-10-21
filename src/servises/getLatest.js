import { baseAPI } from "./baseApi";

export const getLatest = async () => {
  const response = await baseAPI.get("/api/product/latestproducts");
  return response.data;
};
