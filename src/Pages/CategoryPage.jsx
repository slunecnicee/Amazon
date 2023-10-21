import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import ProductBox from "../components/categoryPage/ProductBox";
import { useParams } from "react-router-dom";
import sorry from "../images/sorry.jpeg";
import { useEffect, useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";

const CategoryPage = ({ StarRating, generateStarRating }) => {
  const { products, isLoading } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputFiltered, setInputFiltered] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const filteredProductss = products.filter(
      (product) => product.categoryId === id
    );

    setFilteredProducts(filteredProductss);
    setInputFiltered(filteredProductss);
  }, [id]);

  const handlePriceFiler = () => {
    const filtered = inputFiltered.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header />
      <section className="product-category">
        <div className="aside">
          <div
            style={{ marginTop: "20px" }}
            onKeyDown={handlePriceFiler}
            className="minMax"
          >
            <Typography variant="h6">Filter By Price</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="min-price"
                  label="Minimum Price"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  fullWidth
                  sx={{
                    "&:focus": {
                      outline: "2px solid orange",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="max-price"
                  label="Maximum Price"
                  type="number"
                  InputProps={{ inputProps: { min: 10 } }}
                  placeholder="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </div>

        {filteredProducts.length > 0 && !isLoading ? (
          <ProductBox
            filteredProducts={filteredProducts}
            StarRating={StarRating}
            generateStarRating={generateStarRating}
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
    </>
  );
};

export default CategoryPage;
