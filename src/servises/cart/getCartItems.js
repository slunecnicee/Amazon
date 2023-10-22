import { baseAPI } from "../baseApi";
export const getCartItems = async () => {
  const token = localStorage.getItem("token");
  const response = await baseAPI.get("/api/cart/getmycartproducts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
};
