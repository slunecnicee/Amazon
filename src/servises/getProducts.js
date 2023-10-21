import { baseAPI } from "./baseApi";
export const getProducts = async () => {
  const response = await baseAPI.get("/api/product/products");
  return response.data;
};
