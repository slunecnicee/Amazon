import { useNavigate } from "react-router-dom";

const DetailsMd = ({
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
    <div className="cat-wrp-Md">
      {filteredProducts.map((product) => (
        <article className="productBox" key={product.id}>
          <img
            onClick={() => handleClick(product.id)}
            src={product.images[0]}
            alt=""
          />
          <div className="text">
            <p className="p-name">{product.name}</p>
            <StarRating rating={generateStarRating()} />
            <p>Brand: {product.brand}</p>
            <p> Model: {product.model}</p>
            <p className="productPrice">
              <span className="dollarSign">$</span>
              <span className="mainPrice">{parseInt(product.price)}</span>
              <span className="decimalPoints">
                {(product.price % 1).toFixed(2).slice(1)}
              </span>
            </p>
            <p className="p78" onClick={() => handleClick(product.id)}>
              see more
            </p>
          </div>
          <button onClick={() => handleAddToCart(product.id)} className="btn66">
            Add In Cart
          </button>
        </article>
      ))}
    </div>
  );
};

export default DetailsMd;
