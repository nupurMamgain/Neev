import React, { useState } from "react";
import { Link } from "react-router-dom";
import IDUpload from "./IDUpload.jsx"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSignupDropdown = () => setIsSignupDropdownOpen(!isSignupDropdownOpen);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/30 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/neev2.png" alt="NEEV Logo" className="h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">

          <Link to="#features" className="px-3 py-1 rounded-md transition duration-300 bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-1">
            <span className="text-lg">⚡</span> Features
          </Link>

          <Link to="#mission" className="px-3 py-1 rounded-md transition duration-300 bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-1">
            <span className="text-lg">🎯</span> Our Mission
          </Link>

          <Link to="#download" className="px-3 py-1 rounded-md transition duration-300 bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-1">
            <span className="text-lg">📱</span> Download App
          </Link>

          <Link to="/login" className="px-3 py-1 rounded-md transition duration-300 bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-1">
            <span className="text-lg">🔑</span> Login
          </Link>

          {/* Signup Dropdown */}
          <div className="relative">
            <button
              onClick={toggleSignupDropdown}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition flex items-center gap-1"
            >
              <span className="text-lg">➕</span> Register
            </button>

            {isSignupDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                <Link
                  to="/teacher-register"  // ✅ Updated route
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                  onClick={() => setIsSignupDropdownOpen(false)}
                >
                  <span className="mr-2">🧑‍🏫</span> Teacher Sign In
                </Link>

                <Link
                  to="/student-register"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                  onClick={() => setIsSignupDropdownOpen(false)}
                >
                  <span className="mr-2">📚</span> Student Sign In
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="px-3 py-2 text-2xl rounded-md bg-gray-100 text-black hover:bg-gray-200 shadow-sm"
          >
            ☰
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg py-2">

          <Link to="#features" onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">⚡</span> Features
          </Link>

          <Link to="#mission" onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">🎯</span> Our Mission
          </Link>

          <Link to="#download" onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">📱</span> Download App
          </Link>

          <Link to="/login" onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">🔑</span> Login
          </Link>

          {/* Mobile Signup Dropdown */}
          <div className="relative">
            <button
              onClick={toggleSignupDropdown}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-2">➕</span> Register
            </button>

            {isSignupDropdownOpen && (
              <div className="pl-6">
                <Link
                  to="/teacher-register" // ✅ Updated route
                  onClick={() => { toggleMenu(); setIsSignupDropdownOpen(false); }}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Teacher Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() => { toggleMenu(); setIsSignupDropdownOpen(false); }}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Student Sign In
                </Link>
              </div>
            )}
          </div>

          <hr className="my-1" />

          <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">🌙</span> Dark Mode
          </Link>
          <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">ℹ️</span> About
          </Link>
          <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">⚙️</span> Settings
          </Link>
          <Link to="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100">
            <span className="mr-2">🚪</span> Logout
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
