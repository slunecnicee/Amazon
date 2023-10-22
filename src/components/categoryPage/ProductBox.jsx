import DetailsLg from "./DetailsLg";
import DetailsMd from "./DetailsMd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddProduct } from "../../features/user";
import { getProductById } from "../../servises/getProductById";
import { addInCart } from "../../servises/cart/addInCart";

const ProductBox = ({
  filteredProducts,
  StarRating,
  generateStarRating,
  setCartModal,
}) => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state) => state.user);

  const handleAddToCart = async (id) => {
    if (!isSignedIn) {
      window.alert("Please sign in first");
      return;
    } else {
      try {
        const product = await getProductById(id);
        await addInCart(id);
        dispatch(handleAddProduct(product));
        setCartModal(true);
      } catch (err) {
        console.log(err);
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
