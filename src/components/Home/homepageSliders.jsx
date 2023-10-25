import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Sliders = ({ title, products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 379,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const push = useNavigate();

  const handleClick = (id) => {
    push(`/product/${id}`);
  };

  return (
    <div className="card">
      <h2 className="slider-title">{title}</h2>
      <Slider {...settings} className="image-slider">
        {products.map((p, index) => (
          <div key={index} className="slider-item">
            {p.image ? (
              <img
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(p.id)}
                src={p.image}
                alt={p.name}
                className="product-image"
              />
            ) : (
              <img
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(p.id)}
                src={p.images[0]}
                alt={p.name}
                className="product-image"
              />
            )}
            {p.oldPrice && p.newPrice && (
              <p className="deal">
                <span>
                  {Math.round(((p.oldPrice - p.newPrice) / p.oldPrice) * 100)}%
                  off
                </span>{" "}
                <span>Deal</span>
              </p>
            )}
            {p.newPrice && (
              <p className="new-price">
                ${p.newPrice}{" "}
                <span>
                  Last Price: <span>${p.oldPrice}</span>{" "}
                </span>{" "}
              </p>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;
