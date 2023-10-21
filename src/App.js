import "./App.scss";
import HomePage from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./Pages/AllProductsPage";
import RegisterUser from "./Pages/RegisterUser";
import HelpPage from "./Pages/Help";
import ConditionsPage from "./Pages/conditions";
import PrivacyNoticePage from "./Pages/PrivacyNotice";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/protectedRoute";
import CategoryPage from "./Pages/CategoryPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRedCategories } from "./features/categories";
import { getRedDemanded } from "./features/mostdemanded";
import { getRedLatest } from "./features/latest";
import { getRedOffers } from "./features/offers";
import { getRedProducts } from "./features/products";
import SingleProductPage from "./Pages/SingleProductPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRedProducts());
    dispatch(getRedCategories());
    dispatch(getRedOffers());
    dispatch(getRedLatest());
    dispatch(getRedDemanded());
  }, []);

  const generateStarRating = () => {
    return 3 + Math.random() * 2;
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} style={{ color: "#FFD700", marginRight: "4px" }}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: "#DDD", marginRight: "4px" }}>
            ★
          </span>
        );
      }
    }

    return (
      <div>
        {stars}
        <span style={{ marginLeft: "8px", fontSize: "16px" }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms&conditions" element={<ConditionsPage />} />
          <Route path="/privacynotice" element={<PrivacyNoticePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/categorypage/:id"
            element={
              <CategoryPage
                StarRating={StarRating}
                generateStarRating={generateStarRating}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <SingleProductPage
                StarRating={StarRating}
                generateStarRating={generateStarRating}
              />
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/allproducts" element={<AllProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
