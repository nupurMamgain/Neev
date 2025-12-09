import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Xnavbar from "./components/Xnavbar";
import Footer from "./components/Footer";
import PWAPrompt from "./components/PWAPrompt";
import "./App.css"

const App = () => {
  const location = useLocation();
  
  const showXnavbar = location.pathname.includes("dashboard");
  
  // Hide footer on certain pages for better mobile experience
  const hideFooter = ['/student-dashboard', '/quiz-page', '/chapter'].some(
    path => location.pathname.includes(path)
  );
  
  return (
    <> 
      {/* {showXnavbar && <Xnavbar />} */}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      
      {/* PWA Install Prompt & Offline Indicator */}
      <PWAPrompt />
    </>
  );
};

export default App;
