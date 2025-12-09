// src/App.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Xnavbar from "./components/Xnavbar";
import Footer from "./components/Footer";
import PWAPrompt from "./components/PWAPrompt";

import "./App.css";

const App = () => {
  const location = useLocation();

  // Decide where to show navbar
  const showXnavbar = location.pathname.includes("dashboard");

  // Decide where to hide footer
  const hideFooter = ['/student-dashboard', '/quiz-page', '/chapter'].some(
    path => location.pathname.includes(path)
  );

  return (
    <>
      {/* Navbar (disabled by you, can enable if needed) */}
      {/* {showXnavbar && <Xnavbar />} */}

      {/* Page Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideFooter && <Footer />}

      {/* PWA Prompt */}
      <PWAPrompt />
    </>
  );
};

export default App;
