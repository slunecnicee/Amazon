import { baseAPI } from "../baseApi";

export const addInCart = async (id) => {
  const token = localStorage.getItem("token");
  baseAPI.post(
    "/api/cart/addincart",
    { productId: id },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};
