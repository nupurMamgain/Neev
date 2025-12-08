//LANDING//
// Mission.jsx//
import React from "react";

const Mission = () => {
  return (
    <div className="relative w-full py-24">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg.jpeg')" }}></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <section className="relative z-10 max-w-4xl mx-auto px-10 py-16 bg-white/40 backdrop-blur-3xl rounded-3xl shadow-2xl text-center">
        <h2 className="text-4xl font-bold text-black">Our Mission</h2>
        <p className="mt-4 text-lg text-black leading-relaxed">
          Our mission is to bridge the educational gap by providing high-quality,
          accessible, and personalized learning tools to every student in rural India.
          We believe that technology can unlock a world of opportunities, and we are
          dedicated to ensuring no child is left behind.
        </p>
      </section>
    </div>
  );
};

export default Mission;
