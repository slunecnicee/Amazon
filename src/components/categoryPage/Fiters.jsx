import {
  Typography,
  TextField,
  Grid,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const priceArr = [
  {
    name: "under $100",
    min: 1,
    max: 100,
  },
  {
    name: "$100 to $200",
    min: 100,
    max: 200,
  },
  {
    name: "$200 to $300",
    min: 200,
    max: 300,
  },
  {
    name: "$300 to 400",
    min: 300,
    max: 400,
  },
  {
    name: "$500 +",
    min: 500,
  },
];

const Fiters = ({ uniqueBrands, inputFiltered, setFilteredProducts }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:1099px)");

  const handlePriceFilter = () => {
    const filtered = inputFiltered.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
      );
    });
    setFilteredProducts(filtered);
  };

  const handleBrandFilter = () => {
    const filtered = inputFiltered.filter((product) => {
      return product.brand !== brand;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="aside">
      <div
        style={{
          marginTop: "17px",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
        className="minMax"
      >
        <Typography sx={{ borderBottom: "1px solid lightgray" }} variant="h6">
          Filter By Price
        </Typography>
        <Grid
          onKeyDown={handlePriceFilter}
          sx={{ marginTop: "5px" }}
          container
          spacing={2}
        >
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

        <FormControl sx={{ marginTop: "20px" }} component="fieldset">
          <Typography sx={{ borderBottom: "1px solid lightgray" }} variant="h6">
            Filter by price
          </Typography>
          <RadioGroup
            sx={
              isSmallScreen ? { display: "flex", flexDirection: "row" } : null
            }
            name="price"
          >
            {priceArr.map((item) => (
              <FormControlLabel
                key={item.name}
                value={item.min}
                control={<Radio />}
                label={item.name}
                onChange={() => {
                  const filtered = inputFiltered.filter((product) => {
                    const price = product.price;
                    return (
                      (!item.min || price >= item.min) &&
                      (!item.max || price <= item.max)
                    );
                  });
                  setFilteredProducts(filtered);
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {uniqueBrands.length > 0 && (
          <FormControl sx={{ marginTop: "20px" }} component="fieldset">
            <Typography
              sx={{ borderBottom: "1px solid lightgray" }}
              variant="h6"
            >
              Filter by brand
            </Typography>
            <RadioGroup
              sx={
                isSmallScreen ? { display: "flex", flexDirection: "row" } : null
              }
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {uniqueBrands.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item}
                  control={<Radio />}
                  label={item}
                  onChange={handleBrandFilter}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>
    </div>
  );
};

export default Fiters;
