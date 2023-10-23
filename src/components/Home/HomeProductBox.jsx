import boxes from "../../images/boxes.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeProductBox = ({ identicalCategoryProducts }) => {
  const push = useNavigate();

  const { isSignedIn } = useSelector((state) => state.user);

  const handleProductClick = (id) => {
    push(`/product/${id}`);
  };

  const handleSeeMoreClick = (catId) => {
    push(`/categorypage/${catId}`);
  };

  return (
    <section className="productes">
      {identicalCategoryProducts?.map((product) => (
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
        {!isSignedIn ? (
          <>
            <h3>Sign in for besr experience</h3>
            <button onClick={() => push("/login")}>Sign in securely</button>
          </>
        ) : (
          <h3>Start Shopping Now </h3>
        )}
      </div>
    </section>
  );
};

export default HomeProductBox;
