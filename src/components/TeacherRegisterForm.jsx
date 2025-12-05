// src/components/TeacherRegisterForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IDUpload from "./IDUpload.jsx"; // ✅ directly in the same folder



const TeacherRegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    primarySubject: '',
    currentInstitute: '',
    teachingExperience: '',
    // Add file state for ID upload if needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Registration Data:", formData);
    // Add your API call logic here
  };

  // Define the gradient colors exactly as seen in the image
  const gradientClass = "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700";

  return (
    <div className="w-full p-8">
      <div className="text-center mb-10">
        {/* NEEV Logo */}
        <div className="flex justify-center mb-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Using a simple SVG placeholder for NEEV logo, replace with actual image if available */}
            <circle cx="12" cy="12" r="10" fill="#66BB6A"/>
            <path d="M10 8L14 12L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Join Us at Neev
        </h1>
        <p className="text-gray-500 mt-1">
          Become a cornerstone of our learning community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Full Name */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 sr-only">Full Name</label>
          <div className="flex items-center">
            <span className="absolute left-0 text-gray-400">
              {/* Person Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g., Anjali Khanna"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="pl-8 w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email Address</label>
          <div className="flex items-center">
            <span className="absolute left-0 text-gray-400">
              {/* Mail Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2-3a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"></path></svg>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-8 w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700 sr-only">Phone Number</label>
          <div className="flex items-center">
            <span className="absolute left-0 text-gray-400">
              {/* Phone Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="pl-8 w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Primary Subject */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="primarySubject" className="text-sm font-medium text-gray-700 sr-only">Primary Subject</label>
          <div className="flex items-center">
            <span className="absolute left-0 text-gray-400">
              {/* Plus Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </span>
            <input
              id="primarySubject"
              name="primarySubject"
              type="text"
              placeholder="e.g., Mathematics"
              value={formData.primarySubject}
              onChange={handleChange}
              required
              className="pl-8 w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Current Institute */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="currentInstitute" className="text-sm font-medium text-gray-700 sr-only">Current Institute</label>
          <div className="flex items-center">
            <span className="absolute left-0 text-gray-400">
              {/* Institute/Building Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1.5m-1.5 4h1.5m-1.5 4h1.5"></path></svg>
            </span>
            <input
              id="currentInstitute"
              name="currentInstitute"
              type="text"
              placeholder="e.g., Delhi Public School"
              value={formData.currentInstitute}
              onChange={handleChange}
              required
              className="pl-8 w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Teaching Experience Dropdown */}
        <div className="relative border-b border-gray-200 py-2">
          <label htmlFor="teachingExperience" className="text-sm font-medium text-gray-700 sr-only">Teaching Experience</label>
          <div className="flex items-center">
            {/* Using a select element for the dropdown */}
            <select
              id="teachingExperience"
              name="teachingExperience"
              value={formData.teachingExperience}
              onChange={handleChange}
              required
              className="w-full p-1 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-500 appearance-none"
            >
              <option value="" disabled>Select teaching experience</option>
              <option value="0-1">0 - 1 Year</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
            {/* Dropdown Arrow Icon */}
            <span className="absolute right-0 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </div>
        </div>

        {/* Verify ID Card Upload Section */}
        <IDUpload />

        {/* Create Account Button (Gradient) */}
        <button
          type="submit"
          className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ${gradientClass}`}
        >
          Create Account
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <Link to="/login" className="text-purple-600 font-medium hover:text-purple-700 ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default TeacherRegisterForm;