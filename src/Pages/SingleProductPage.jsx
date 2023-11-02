import { useParams } from "react-router-dom";
import { getProductById } from "../servises/getProductById";
import { useState, useEffect } from "react";
import SingleProductBox from "../components/singleProduct/singleProductBox";
import { PulseLoader } from "react-spinners";
import noproduct from "../images/noProduct.jpeg";

const SingleProductPage = ({ StarRating, generateStarRating }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct({
        isLoading: false,
        data: res,
      });
    });
  }, [id]);

  if (product.isLoading) {
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
          loading={product.isLoading}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  const { data } = product;
  console.log(data);

  return (
    <>
      {Object.values(data).length > 0 ? (
        <div className="singleProductPageCont">
          <SingleProductBox
            product={data}
            generateStarRating={generateStarRating}
            StarRating={StarRating}
          />
        </div>
      ) : (
        <div>
          <img style={{ width: "100%" }} src={noproduct} alt="noproduct" />
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
