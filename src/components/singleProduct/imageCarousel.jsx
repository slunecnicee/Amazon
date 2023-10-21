import { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-bottom-images">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel-pic ${
              index === selectedImageIndex ? "carousel-active-thumbnail" : ""
            }`}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onMouseEnter={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      <div className="img-thumbnail">
        <img
          className="carousel-selected-image"
          src={images[selectedImageIndex]}
          alt="Selected"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
