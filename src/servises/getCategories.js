import { baseAPI } from "./baseApi";
export const getCategories = async () => {
  const response = await baseAPI.get("/api/product/categories");
  return response.data;
};
