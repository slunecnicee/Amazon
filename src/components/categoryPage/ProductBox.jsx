import DetailsLg from "./DetailsLg";
import DetailsMd from "./DetailsMd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddProduct } from "../../features/user";
import { getProductById } from "../../servises/getProductById";
import { addInCart } from "../../servises/cart/addInCart";
import { toast } from "react-toastify";

const ProductBox = ({ filteredProducts, StarRating, generateStarRating }) => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state) => state.user);

  const handleAddToCart = async (id) => {
    if (!isSignedIn) {
      toast.error("please login to continue");
      return;
    } else {
      try {
        const product = await getProductById(id);
        await addInCart(id);
        dispatch(handleAddProduct(product));
        toast.success("Product added to cart");
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
