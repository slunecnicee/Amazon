import { baseAPI } from "../baseApi";

export const addToCart = (product) => {
  const token = localStorage.getItem("token");
  baseAPI.post(
    "/api/cart/addincart",
    { productId: product.id },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};
