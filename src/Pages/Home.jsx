import { useSelector } from "react-redux";
import Sliders from "../components/Home/homepageSliders";
import Carusel from "../components/Home/carusel";
import HomeProductBox from "../components/Home/HomeProductBox";
import HomeProductBoxSm from "../components/Home/HomeProductBoxSm";
import { PulseLoader } from "react-spinners";
import amazon from "../images/amazon.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { isSignedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { categories, isLoading: categoriesIsLoading } = useSelector(
    (state) => state.categories
  );

  const { offers, isLoading: offersIsLoading } = useSelector(
    (state) => state.offers
  );

  const { latest, isLoading: latestIsLoading } = useSelector(
    (state) => state.latest
  );

  const { demanded, isLoading: mostDemandedIsLoading } = useSelector(
    (state) => state.demanded
  );

  if (
    isLoading ||
    categoriesIsLoading ||
    offersIsLoading ||
    latestIsLoading ||
    mostDemandedIsLoading
  ) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ width: "20%" }} src={amazon} alt="amazon logo" />
        <PulseLoader
          color={"orange"}
          loading={
            isLoading ||
            categoriesIsLoading ||
            offersIsLoading ||
            latestIsLoading ||
            mostDemandedIsLoading
          }
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  const productsWithCategoryName = products?.map((product, index) => {
    const category = categories.find((cat) => cat.id === product.categoryId);
    const isShowAllImages = index < 3;
    return {
      ...product,
      categoryName: category ? category.name : "Unknown Category",
      images: isShowAllImages ? product.images : [product.images[1]],
    };
  });

  const uniqueCategoryNames = [
    ...new Set(productsWithCategoryName.map((product) => product.categoryName)),
  ];

  const oneProductPerCategory = uniqueCategoryNames.map((categoryName) => {
    return productsWithCategoryName.find(
      (product) => product.categoryName === categoryName
    );
  });

  const homePageProducts = [
    ...oneProductPerCategory,
    ...productsWithCategoryName.slice(1, 8),
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <Carusel />
      <HomeProductBox identicalCategoryProducts={homePageProducts} />

      <HomeProductBoxSm identicalCategoryProducts={homePageProducts} />
      {!isSignedIn ? (
        <div className="signIn-mobile">
          <h3>Sign in for the best experience</h3>
          <button onClick={() => navigate("/login")}>Sign in securely</button>
          <p onClick={() => navigate("/register")}>create account</p>
        </div>
      ) : (
        <div style={{ padding: "10px" }} className="signIn-mobile">
          <h3>Happy Shopping with us</h3>
          <button>Start shopping</button>
        </div>
      )}

      <div className="sliderWrp">
        <Sliders products={latest} title={"Latest Products"} />
        <Sliders products={offers} title={"Best Offers"} />
        <Sliders products={demanded} title={"Popular Products"} />
      </div>
    </div>
  );
};

export default HomePage;
