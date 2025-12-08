import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-gray-600 text-sm">© 2025 NEEV by EduRural</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="#" className="text-gray-500 hover:text-gray-700">Privacy</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-700">Terms</Link>
            <Link to="#" className="text-gray-500 hover:text-gray-700">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
