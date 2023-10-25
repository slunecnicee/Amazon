import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRemoveOptimisticProduct,
  removeRedCartItem,
} from "../features/user";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header/Header";
import emptyCart from "../images/empty-cart.webp";
import { useNavigate } from "react-router-dom";
import amazon from "../images/amazon.png";
import Sliders from "../components/Home/homepageSliders";
import { toast } from "react-toastify";
import Footer from "../components/Footer/Pagefooter";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, unique_name, nameid } = useSelector((state) => state.user);
  const { latest, isLoading: latestIsLoading } = useSelector(
    (state) => state.latest
  );
  const push = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      axios
        .post("http://localhost:4242/api/create-checkout-session", {
          cartItems: selectedItems,
          userId: nameid,
        })
        .then((res) => {
          if (res.data.url) {
            console.log(res.data);
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:4242/create-checkout-session", {
          cartItems: cartItems.data,
          userId: nameid,
        })
        .then((res) => {
          if (res.data.url) {
            console.log(res.data);
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function getRandomQuantity(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const subtotal = selectedItems.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);

  const totalprice = Object.values(cartItems.data).reduce(
    (accumulator, product) => {
      return accumulator + product.price;
    },
    0
  );

  const deselectAllItems = () => {
    setSelectedItems([]);
    toast.success("all items are deselected");
  };

  const handleRemoveFromCart = (id) => {
    dispatch(handleRemoveOptimisticProduct(id));
    dispatch(removeRedCartItem(id));
    toast.success("item removed from cart");
  };

  const removeAllItems = () => {
    Object.keys(data).forEach((productId) => {
      dispatch(handleRemoveOptimisticProduct(productId));
      dispatch(removeRedCartItem(productId));
    });
    toast.success("Cart is cleared");
  };

  if (cartItems.isLoading || latestIsLoading) {
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
        <PulseLoader
          color={"orange"}
          loading={cartItems.isLoading || latestIsLoading}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  const handleSelect = (product) => {
    const isSelected = selectedItems.some(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedProduct) => selectedProduct.id !== product.id
        )
      );
    } else {
      setSelectedItems([...selectedItems, product]);
    }
  };

  console.log(selectedItems);

  const { data } = cartItems;

  return (
    <>
      <Header />
      {Object.values(data).length ? (
        <div className="cart">
          <div className="cart-leftbar">
            <div className="title">
              <h3>Shopping Cart</h3>
              <div style={{ display: "flex", gap: "15px" }}>
                <p onClick={removeAllItems}>Delete All Items</p>
                <p onClick={deselectAllItems}>DeSelect All Items</p>
              </div>
            </div>
            {Object.values(data).map((product) => (
              <div className="cart-item" key={product.id}>
                <input
                  type="checkbox"
                  onChange={() => handleSelect(product)}
                  checked={selectedItems.some(
                    (selectedProduct) => selectedProduct.id === product.id
                  )}
                />
                <img src={product.images[0]} alt={product.name} />
                <div className="p-info">
                  <h4>{product.name}</h4>
                  <h4 className="price">${product.price}</h4>
                  <p className="p1">Save more with Subscribe & Save</p>
                  <p className="p2">{getRandomQuantity(3, 20)} In Stock</p>

                  <input type="number" min={1} placeholder="Qty : 1" />

                  <div className="btns">
                    <p onClick={() => handleRemoveFromCart(product.id)}>
                      Delete
                    </p>
                    <p>Save for later</p>
                    <p>Compare with similar items</p>
                    <p>Share</p>
                  </div>
                </div>
              </div>
            ))}

            {selectedItems.length > 0 ? (
              <div className="subtotal">
                Subtotal {`(${selectedItems.length} items):`}{" "}
                <span>$ {subtotal}</span>
              </div>
            ) : (
              <div className="subtotal">
                Subtotal ({Object.keys(data).length} items){" "}
                <span>
                  ${Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                </span>
              </div>
            )}
          </div>

          <div className="rightbar">
            {selectedItems.length > 0 ? (
              <h3 className="subtotal">
                Subtotal {`(${selectedItems.length} items):`}{" "}
                <span>$ {subtotal}</span>
              </h3>
            ) : (
              <h3 className="subtotal">
                Subtotal ({Object.keys(data).length} items){" "}
                <span>
                  ${Object.keys(data).length > 0 ? totalprice.toFixed(2) : 0}
                </span>
              </h3>
            )}
            <button onClick={() => handleCheckout()}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "fit-content",
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="noproducts"
        >
          <img src={emptyCart} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              width: "fit-content",
              height: "fit-content",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <p>Hello {unique_name}</p>
            <h3 style={{ whiteSpace: "nowrap" }}>Your cart is empty</h3>
            <button
              onClick={() => push("/")}
              style={{
                padding: "13px",
                fontWeight: "600",
                backgroundColor: "orange",
                borderRadius: "5px",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div>
        <Sliders products={latest} title={"Recomended for You"} />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
