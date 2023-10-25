import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../servises/cart/addToCart";
import { handleAddProduct } from "../../features/user";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../servises/getProductById";
import { toast } from "react-toastify";
import axios from "axios";

const defaultState = {
  data: [],
  isLoading: true,
  isLoaded: false,
  isError: false,
};

const ProductButtons = ({ price }) => {
  const [stock, setStock] = useState(0);
  const [futureDate, setFutureDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(defaultState);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSignedIn, nameid } = useSelector((state) => state.user);
  const [productToBuy, setProductToBuy] = useState([]);

  const dispatch = useDispatch();

  const handleBuyNow = () => {
    axios
      .post("http://localhost:4242/api/create-checkout-session", {
        cartItems: productToBuy,
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
  };

  useEffect(() => {
    getProductById(id).then((res) => {
      try {
        setSelectedProduct({
          data: res,
          isLoading: false,
          isLoaded: true,
          isError: false,
        });
        setProductToBuy([res]);
      } catch (err) {
        setSelectedProduct({
          data: [],
          isLoading: false,
          isLoaded: true,
          isError: true,
        });
      }
    });
  }, [id]);

  console.log(selectedProduct.data);

  useEffect(() => {
    const random = Math.random();
    const randomNumber = Math.floor(3 + random * (20 - 3 + 1));
    setStock(randomNumber);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 4);
    const date = futureDate.toDateString();
    setFutureDate(date);
  }, []);

  const handleAddToCart = async () => {
    if (isSignedIn) {
      dispatch(handleAddProduct(selectedProduct.data));
      addToCart(selectedProduct.data);
      toast.success("Product added to cart");
    } else {
      toast.error("please login to continue");
      navigate("/");
    }
  };

  return (
    <div className="productButtons">
      <div className="price">{price} $</div>

      <div className="shippingInfo">
        <p> No Import Fees Deposit & </p>
        <p>free Shipping to Georgia</p>
      </div>

      <div className="delivery">
        Delivery <span>{futureDate}</span>
      </div>

      <div className="deliveryTo">
        <FaMapMarkerAlt /> <span>Delivery to Georgia</span>
      </div>

      <div className="stock">
        Only {stock} left in stock {"(more on the way)"}{" "}
      </div>

      <input type="number" min={1} max={stock} placeholder="Qty : 1" />

      <button className="yellow" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button onClick={handleBuyNow} className="orange">
        Buy Now
      </button>

      <div className="payment">
        <div className="grayText">
          <p>Payment</p>
          <p>Ships from</p>
          <p>Sold by</p>
          <p>Returns</p>
        </div>

        <div className="blueText">
          <p>Secure Transaction</p>
          <p className="p1">Amazon.com</p>
          <p className="p1">Amazon.com</p>
          <p>within 30 days of receipt</p>
        </div>
      </div>

      <p className="terms">Terms and Conditions</p>
    </div>
  );
};

export default ProductButtons;
