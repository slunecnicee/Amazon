import { baseAPI } from "../baseApi";

export const removeCartItem = async (productId) => {
  const token = localStorage.getItem("token");
  const response = await baseAPI.delete(`/api/cart/removefromcart`, {
    data: { productId },
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data ? productId : false;
};
