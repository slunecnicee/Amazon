import { useSelector } from "react-redux";

import ProductBox from "../components/categoryPage/ProductBox";
import { useParams } from "react-router-dom";
import sorry from "../images/sorry.jpeg";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import amazon from "../images/amazon.png";

import Filters from "../components/categoryPage/Fiters";
import CloseIcon from "@mui/icons-material/Close";
import { Pagination } from "@mui/material";
const CategoryPage = ({ StarRating, generateStarRating }) => {
  const { products, isLoading } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputFiltered, setInputFiltered] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!isLoading) {
      const filteredProductss = products.filter(
        (product) => product.categoryId === id
      );
      console.log(filteredProductss);

      setFilteredProducts(filteredProductss);

      setInputFiltered(filteredProductss);
    }
  }, [isLoading, id, products]);

  const brandArr = products.map((item) => item.brand);
  const uniqueBrands = [...new Set(brandArr)];

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredProducts.slice(startIndex, endIndex);

  if (isLoading) {
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
          loading={isLoading}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <>
      {!showFilters && (
        <p className="show-filters" onClick={() => setShowFilters(true)}>
          show filters
        </p>
      )}

      {showFilters && (
        <div className="filterModal">
          <Filters
            uniqueBrands={uniqueBrands}
            setFilteredProducts={setFilteredProducts}
            inputFiltered={inputFiltered}
          />
          <CloseIcon
            className="close-filters"
            onClick={() => setShowFilters(false)}
          />
        </div>
      )}

      <section className="product-category">
        <Filters
          uniqueBrands={uniqueBrands}
          setFilteredProducts={setFilteredProducts}
          inputFiltered={inputFiltered}
        />

        {products.length > 0 && !isLoading ? (
          <ProductBox
            filteredProducts={displayedData}
            StarRating={StarRating}
            generateStarRating={generateStarRating}
            uniqueBrands={uniqueBrands}
            setFilteredProducts={setFilteredProducts}
            inputFiltered={inputFiltered}
          />
        ) : (
          <div className="no-products">
            <img
              style={{ width: "100%", height: "100%" }}
              src={sorry}
              alt="No Products Found"
            />
          </div>
        )}
      </section>

      {filteredProducts.length > 5 && (
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      )}
    </>
  );
};

export default CategoryPage;
