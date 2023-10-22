import { useDispatch, useSelector } from "react-redux";
import Sliders from "../components/Home/homepageSliders";
import Carusel from "../components/Home/carusel";
import Header from "../components/Header/Header";
import HomeProductBox from "../components/Home/HomeProductBox";
import HomeProductBoxSm from "../components/Home/HomeProductBoxSm";
import { PulseLoader } from "react-spinners";

const HomePage = () => {
  const { products, isLoading } = useSelector((state) => state.products);

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

  return (
    <>
      <Header />
      <Carusel />
      <HomeProductBox productsWithCategoryName={productsWithCategoryName} />

      <HomeProductBoxSm productsWithCategoryName={productsWithCategoryName} />

      <div className="signIn-mobile">
        <h3>Sign in for the best experience</h3>
        <button>Sign in securely</button>
        <p>create account</p>
      </div>

      <div className="sliderWrp">
        <Sliders products={latest} title={"Latest Products"} />
        <Sliders products={offers} title={"Best Offers"} />
        <Sliders products={demanded} title={"Popular Products"} />
      </div>
    </>
  );
};

export default HomePage;
