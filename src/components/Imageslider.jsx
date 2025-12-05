import React, { useEffect, useState } from "react";

const ImageSlider = ({ images, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slider);
  }, [images.length, interval]);

  return (
    <div className="w-full h-full overflow-hidden rounded-none relative">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
