import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Xnavbar";
import Footer from "./components/Footer";
import "./App.css"

const App = () => {
  return (
    <>
     {/* Navbar visible on all pages */}
    
      
      <main >
        <Outlet /> {/* Pages will render here */}
      </main>

      <Footer />
    </>
  );
};

export default App;
