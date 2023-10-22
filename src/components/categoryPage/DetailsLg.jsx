import { useNavigate } from "react-router-dom";

const DetailsLg = ({
  filteredProducts,
  StarRating,
  generateStarRating,
  handleAddToCart,
}) => {
  const push = useNavigate();

  const handleClick = (id) => {
    push(`/product/${id}`);
  };

  return (
    <div className="cat-wrp-LG">
      {filteredProducts.map((product) => (
        <article className="productBoxLg" key={product.id}>
          <div onClick={() => handleClick(product.id)} className="imgdiv">
            <img src={product.images[0]} alt="" />
          </div>
          <div className="text">
            <h3>{product.name.substring(0, 200)}...</h3>
            <StarRating
              style={{ fontSize: "20px" }}
              rating={generateStarRating()}
            />
            <p>Brand: {product.brand}</p>
            <p> Model: {product.model}</p>
            <p className="productPrice" style={{ fontSize: "22px" }}>
              <span className="dollarSign">$</span>
              <span className="mainPrice">{parseInt(product.price)}</span>
              <span className="decimalPoints">
                {(product.price % 1).toFixed(2).slice(1)}
              </span>
            </p>
            <p className="p78" onClick={() => handleClick(product.id)}>
              see more
            </p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="btn65"
            >
              Add In Cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DetailsLg;
