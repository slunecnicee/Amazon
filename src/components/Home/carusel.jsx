import { useState, useEffect } from "react";
import beauty from "../../images/beauty.jpg";
import books from "../../images/books.jpg";
import games from "../../images/games.jpg";
import gaming from "../../images/gaming.jpg";
import home from "../../images/home.jpg";
import kitchen from "../../images/kitchen.jpg";
import news from "../../images/news.jpg";
import toys from "../../images/toys.jpg";

const Carusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [beauty, books, games, gaming, home, kitchen, news, toys];

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <button onClick={prevSlide} className="arrow prev-arrow">
        &#8249;
      </button>
      <button onClick={nextSlide} className="arrow next-arrow">
        &#8250;
      </button>
    </div>
  );
};

export default Carusel;
