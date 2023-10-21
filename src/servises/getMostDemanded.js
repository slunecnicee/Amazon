import { baseAPI } from "./baseApi";

export const getMostDemanded = async () => {
  const response = await baseAPI.get("/api/product/mostdemandproducts");
  return response.data;
};
