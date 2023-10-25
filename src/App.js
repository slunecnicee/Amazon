import "./App.scss";
import "./new.scss";
import HomePage from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./Pages/RegisterUser";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/protectedRoute";
import CategoryPage from "./Pages/CategoryPage";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getRedCategories } from "./features/categories";
import { getRedDemanded } from "./features/mostdemanded";
import { getRedLatest } from "./features/latest";
import { getRedOffers } from "./features/offers";
import { getRedProducts } from "./features/products";
import SingleProductPage from "./Pages/SingleProductPage";
import { getReduxCartItems, handleLogIn } from "./features/user";
import jwtDecode from "jwt-decode";
import Cart from "./Pages/CartPage";
import About from "./Pages/aboutPage";
import UpdatePage from "./Pages/Update";
import PaymentSuccsess from "./Pages/paymentSuccsess";

function App() {
  const dispatch = useDispatch();

  useMemo(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          return false;
        }

        dispatch(handleLogIn(decoded));
        return true;
      } catch (e) {
        return false;
      }
    }

    return false;
  }, []);

  useEffect(() => {
    dispatch(getRedProducts());
    dispatch(getRedCategories());
    dispatch(getRedOffers());
    dispatch(getRedLatest());
    dispatch(getRedDemanded());
    dispatch(getReduxCartItems());
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/aboutPage" element={<About />} />

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/updatePage" element={<UpdatePage />} />
            <Route path="/success-page" element={<PaymentSuccsess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
