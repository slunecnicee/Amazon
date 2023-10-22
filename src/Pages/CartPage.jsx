import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReduxCartItems,
  handleRemoveOptimisticProduct,
  removeRedCartItem,
} from "../features/user";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(getReduxCartItems());
  }, []);

  function getRandomQuantity(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleItemSelect = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      let updatedItems;

      if (prevSelectedItems.includes(productId)) {
        updatedItems = prevSelectedItems.filter((id) => id !== productId);
      } else {
        updatedItems = [...prevSelectedItems, productId];
      }

      console.log("Selected Items:", updatedItems);

      return updatedItems;
    });
  };

  const calculateSubtotal = () => {
    const selectedProducts = Object.values(cartItems.data).filter((product) =>
      selectedItems.includes(product.id)
    );

    const subtotal = selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );

    return {
      selectedProducts,
      subtotal,
    };
  };

  const totalprice = Object.values(cartItems.data).reduce(
    (accumulator, product) => {
      return accumulator + product.price;
    },
    0
  );

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(handleRemoveOptimisticProduct(id));
    dispatch(removeRedCartItem(id));
  };

  const removeAllItems = () => {
    Object.keys(data).forEach((productId) => {
      dispatch(handleRemoveOptimisticProduct(productId));
      dispatch(removeRedCartItem(productId));
    });
  };

  if (cartItems.isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PulseLoader
          color={"orange"}
          loading={cartItems.isLoading}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  const { data } = cartItems;
  const { selectedProducts, subtotal } = calculateSubtotal();

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
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleItemSelect(product.id)}
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

            {!selectedItems.length == 0 ? (
              <div className="subtotal">
                Subtotal {`(${selectedProducts.length} items):`}{" "}
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
            {!selectedItems.length == 0 ? (
              <h3 className="subtotal">
                Subtotal {`(${selectedProducts.length} items):`}{" "}
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
            <button>Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="noproducts">
          <h2>No products in cart</h2>
        </div>
      )}
    </>
  );
};

export default Cart;
