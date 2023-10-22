import { useSelector } from "react-redux";

const CartModal = () => {
  const { cartItems } = useSelector((state) => state.user);
  const { isLoading, data } = cartItems;

  const totalprice = Object.values(cartItems.data).reduce(
    (accumulator, product) => {
      return accumulator + product.price;
    },
    0
  );

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100px",
        backgroundColor: "red",
        position: "sticky",
        top: "19vh",
        right: "0",
        zIndex: "1",
      }}
      className="cartmodal"
    >
      {Object.values(data).map((product) => (
        <>
          <div className="subtotal">
            <p>subtotal:</p>
            <p>{totalprice.toFixed(2)}</p>
          </div>
          <div className="images" key={product.id}>
            <img
              style={{ width: "50px", height: "50px" }}
              src={product.images[0]}
              alt={product.name}
            />
            <p>${product.price}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default CartModal;
