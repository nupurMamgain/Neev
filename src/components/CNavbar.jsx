//CLASS DASHBOARD//
// src/components/CNavbar.jsx
import React from 'react';

const CNavbar = ({ name }) => {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo and Nav Links */}
        <div className="flex items-center space-x-8">
          {/* Logo - Image from public/images */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/neev2.png" 
              alt="NEEV Logo"
              className="h-10 w-auto"  // Adjust height as needed
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex space-x-6 text-sm text-gray-500 font-medium">
            <a href="#" className="flex items-center space-x-1 text-gray-800 border-b-2 border-[#5448c8] pb-3 -mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3"></path></svg>
              <span>Dashboard</span>
            </a>
            <a href="#" className="hover:text-gray-900">Study Materials</a>
            <a href="#" className="hover:text-gray-900">Quizzes</a>
            <a href="#" className="hover:text-gray-900">About Us</a>
          </div>
        </div>

        {/* Profile and Logout */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 text-sm font-medium flex items-center space-x-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>Profile</span>
          </button>
          <button className="text-gray-700 text-sm font-medium flex items-center space-x-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-3m0 0V9a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Correct - default export
export default CNavbar;