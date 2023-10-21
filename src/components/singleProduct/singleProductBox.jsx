import ImageCarousel from "./imageCarousel";
import ProductButtons from "./ProductButtons";
import ProductInfo from "./ProductInfo";

const SingleProductBox = ({ product, generateStarRating, StarRating }) => {
  return (
    <div className="singleProductCont">
      <ImageCarousel images={product.images} />

      <ProductInfo
        product={product}
        generateStarRating={generateStarRating}
        StarRating={StarRating}
      />

      <ProductButtons price={product.price} />
    </div>
  );
};

export default SingleProductBox;
