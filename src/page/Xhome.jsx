import React from "react";
import Navbar from "../components/Xnavbar.jsx"
import Hero from "../components/Xhero.jsx";
import Features from "../components/Features.jsx";
import Mission from "../components/Xmission.jsx";
import Footer from "../components/Footer.jsx";

const Xhome = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Mission />
      <Footer />
    </div>
  )
}

export default Xhome
