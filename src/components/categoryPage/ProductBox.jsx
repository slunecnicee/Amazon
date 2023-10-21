import DetailsLg from "./DetailsLg";
import DetailsMd from "./DetailsMd";

const ProductBox = ({ filteredProducts, StarRating, generateStarRating }) => {
  return (
    <div className="main-cat-wrp">
      <h2>Results</h2>
      <DetailsMd
        filteredProducts={filteredProducts}
        StarRating={StarRating}
        generateStarRating={generateStarRating}
      />

      <DetailsLg
        filteredProducts={filteredProducts}
        StarRating={StarRating}
        generateStarRating={generateStarRating}
      />
    </div>
  );
};

export default ProductBox;
