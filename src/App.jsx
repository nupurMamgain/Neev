import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Xnavbar from "./components/Xnavbar";
import Footer from "./components/Footer";
import "./App.css"

const App = () => {
  const location = useLocation();
  
  // Don't show Xnavbar on dashboard pages
  const showXnavbar = !location.pathname.includes("dashboard");
  
  return (
    <>
      {/* Show Xnavbar only on non-dashboard pages */}
      {showXnavbar && <Xnavbar />}
      
      <main>
        <Outlet />
      </main>

      {/* Show Footer only on non-dashboard pages */}
      {showXnavbar && <Footer />}
    </>
  );
};

export default App;