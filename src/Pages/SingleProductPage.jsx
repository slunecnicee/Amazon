import { useParams } from "react-router-dom";
import { getProductById } from "../servises/getProductById";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SingleProductBox from "../components/singleProduct/singleProductBox";

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
    return <div>...Loading</div>;
  }

  if (product.data.length == 0) {
    return <div>Product not found</div>;
  }

  const { data } = product;

  return (
    <>
      <Header />
      <div className="singleProductPageCont">
        <SingleProductBox
          product={data}
          generateStarRating={generateStarRating}
          StarRating={StarRating}
        />
      </div>
    </>
  );
};

export default SingleProductPage;
