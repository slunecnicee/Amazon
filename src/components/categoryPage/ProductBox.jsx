import DetailsLg from "./DetailsLg";
import DetailsMd from "./DetailsMd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddProduct } from "../../features/user";
import { getProductById } from "../../servises/getProductById";
import { addInCart } from "../../servises/cart/addInCart";
import { toast } from "react-toastify";

const ProductBox = ({ filteredProducts, StarRating, generateStarRating }) => {
  const dispatch = useDispatch();
  const { isSignedIn, cartItems } = useSelector((state) => state.user);
  const { data } = cartItems;
  console.log(data);

  const handleAddToCart = async (id) => {
    if (!isSignedIn) {
      toast.error("please login to continue");
      return;
    } else {
      try {
        const product = await getProductById(id);
        const isProductInCart = Object.values(data).some(
          (item) => item.id === product.id
        );

        if (isProductInCart) {
          toast.error("Product already in cart");
        } else {
          await addInCart(id);
          dispatch(handleAddProduct(product));
          toast.success("Product added to cart");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong try again later ");
      }
    }
  };

  return (
    <div className="main-cat-wrp">
      <h2>Results</h2>
      <DetailsMd
        filteredProducts={filteredProducts}
        StarRating={StarRating}
        generateStarRating={generateStarRating}
        handleAddToCart={handleAddToCart}
      />

      <DetailsLg
        filteredProducts={filteredProducts}
        StarRating={StarRating}
        generateStarRating={generateStarRating}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductBox;
