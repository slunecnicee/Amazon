import { useState } from "react";

const Filters = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice)
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="aside">
      <div className="minMax">
        <label>
          Minimum Price:
          <input
            type="number"
            value={minValue}
            min="0"
            max={maxValue - 1}
            onChange={handleMinChange}
          />
        </label>
        <br />
        <label>
          Maximum Price:
          <input
            type="number"
            value={maxValue}
            min={minValue + 1}
            max="100"
            onChange={handleMaxChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Filters;
