import React from "react";
import ImageSlider from "./Imageslider";

const Hero = () => {
  const images = [
    "/images/rural.jpg",
    "/images/rural1.jpg",
    "/images/rural2.jpg"
  ];

  return (
    <div className="relative w-full min-h-[60vh] mt-16 flex items-center justify-center px-4 m-auto">

      {/* Background Slider */}
      <div className="absolute inset-0 -z-10">
        <ImageSlider images={images} interval={4000} />
      </div>

      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-0"></div>

      {/* Content */}
      <div className="max-w-2xl text-center py-10 relative z-10"> 
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Education for Every Child, Everywhere
        </h1>

        <p className="text-white mt-3 drop-shadow-md">
          EduRural brings quality digital learning resources to children in rural
          areas, breaking down barriers with offline access and AI-powered support.
        </p>

        {/* Sage Green Button */}
        <button className="bg-[#9CAF88] hover:bg-[#88A072] text-black mt-6 px-6 py-3 rounded-full text-lg shadow-lg transition">
  Start Your Learning Journey
</button>

      </div>
    </div>
  );
};

export default Hero;

