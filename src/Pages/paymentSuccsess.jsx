import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getReduxCartItems,
  handleRemoveOptimisticProduct,
} from "../features/user";
import { removeRedCartItem } from "../features/user";
import { useSelector, useDispatch } from "react-redux";
import amazon from "../images/amazon.png";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { removeCartItem } from "../servises/cart/RemoveFromCart";

const PaymentSuccsess = () => {
  const push = useNavigate();
  const { cartItems, isLoading } = useSelector((state) => state.user);
  const { data } = cartItems;
  console.log(data);
  const dispach = useDispatch();

  const removeAllItems = () => {
    for (let key in data) {
      removeCartItem(key);
      console.log(key);
    }
    console.log("items removed");
    push("/cart");
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img style={{ width: "20%" }} src={amazon} alt="amazon logo" />
      <h3 style={{ color: "green" }}>Your payment was successful !</h3>
      <button
        style={{
          padding: "15px 25px",
          backgroundColor: "orange",
          color: "black",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          width: "fit-content",
          fontWeight: "800",
          fontSize: "18px",
        }}
        onClick={removeAllItems}
      >
        back To cart
      </button>
    </div>
  );
};

export default PaymentSuccsess;
