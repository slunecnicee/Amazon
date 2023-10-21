import { baseAPI } from "./baseApi";

export const getProductById = async (id) => {
  const response = await baseAPI.get(`/api/product/products/${id}`);
  return response.data;
};
