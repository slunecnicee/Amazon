const ProductInfo = ({ product, generateStarRating, StarRating }) => {
  const generateRandomNums = () => {
    const random = Math.random();
    const randomNumber = 100 + random * (300 - 100);

    return Math.floor(randomNumber);
  };

  const randomNum = generateRandomNums();

  return (
    <div className="productInfo">
      <div className="title-rating">
        <h3>{product.name}</h3>
        <div style={{ display: "flex", gap: "15px" }}>
          {" "}
          <StarRating rating={generateStarRating()} />{" "}
          <span className="random">{randomNum} Rating</span>
        </div>
      </div>

      <div className="price-model-brand">
        <h3>
          <span>Price:</span> {product.price} $
        </h3>
        <h4>
          <span>Brand:</span>
          {product.brand}
        </h4>
        <h4>
          <span>Model:</span>
          {product.model}
        </h4>
      </div>

      <div className="description">
        <h3>About this item</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
