import boxes from "../../images/boxes.jpg";
import { useNavigate } from "react-router-dom";

const HomeProductBox = ({ productsWithCategoryName }) => {
  const push = useNavigate();

  const handleProductClick = (id) => {
    push(`/product/${id}`);
  };

  const handleSeeMoreClick = (catId) => {
    push(`/categorypage/${catId}`);
  };

  return (
    <section className="productes">
      {productsWithCategoryName?.map((product) => (
        <div key={product.id} className="product-box">
          <h3 onClick={() => handleSeeMoreClick(product.categoryId)}>
            {product.categoryName}
          </h3>
          <div
            onClick={() => handleProductClick(product.id)}
            className="imagebox"
          >
            {product.images.slice(0, 4).map((i) => (
              <img
                key={i}
                src={i}
                alt={product.categoryName}
                style={
                  product.images.length === 1
                    ? { height: "90%", width: "90%" }
                    : {}
                }
              />
            ))}
          </div>
          <p onClick={() => handleSeeMoreClick(product.categoryId)}>see more</p>
        </div>
      ))}
      <div className="signIn">
        <img src={boxes} alt="boxes" />
        <h3>Sign in for besr experience</h3>
        <button>Sign in securely</button>
      </div>
    </section>
  );
};

export default HomeProductBox;
