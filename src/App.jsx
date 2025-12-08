import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Xnavbar from "./components/Xnavbar";
import Footer from "./components/Footer";
import "./App.css"

const App = () => {
  const location = useLocation();
  
  
  const showXnavbar = location.pathname.includes("dashboard");
  
  return (
    <> 
      {/* {showXnavbar && <Xnavbar />} */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
