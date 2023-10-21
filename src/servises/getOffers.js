import { baseAPI } from "./baseApi";

export const getOffers = async () => {
  const response = await baseAPI.get("/api/product/offers");
  return response.data;
};
