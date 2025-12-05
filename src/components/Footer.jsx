// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-white py-10 px-4" style={{ backgroundColor: '#060e65' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-end">
        <div className="mb-8 sm:mb-0">
          <h3 className="font-semibold text-lg">NEEV by EduRural</h3>
          <p className="text-lightText mt-1">Your partner in building a brighter future.</p>
        </div>

        <div className="flex space-x-5 text-3xl opacity-70">
          <a href="#" className="hover:opacity-100 transition duration-300"><span role="img">📸</span></a>
          <a href="#" className="hover:opacity-100 transition duration-300"><span role="img">🐦</span></a>
          <a href="#" className="hover:opacity-100 transition duration-300"><span role="img">👍</span></a>
          <a href="#" className="hover:opacity-100 transition duration-300"><span role="img">👻</span></a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-700 mt-6">
        <p className="text-lightText text-sm text-center">© 2025 EduRural. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
