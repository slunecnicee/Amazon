import { useNavigate } from "react-router-dom";

const HomeProductBoxSm = ({ productsWithCategoryName }) => {
  const push = useNavigate();

  const handleClick = (id) => {
    push(`/product/${id}`);
  };
  const handleCategoryClick = (id) => {
    push(`/categorypage/${id}`);
  };

  return (
    <section className="product-slider">
      <div className="slider-content">
        {productsWithCategoryName.map((product, index) => (
          <div key={index} className="productbox">
            <h3 onClick={() => handleCategoryClick(product.categoryId)}>
              {product.categoryName}
            </h3>
            <div className="image-container">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(product.id)}
                src={product.images[0]}
                alt={product.categoryName}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductBoxSm;
