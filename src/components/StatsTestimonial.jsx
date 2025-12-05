// src/components/StatsTestimonial.jsx
import React from 'react';
import { AcademicCapIcon, BoltIcon, LanguageIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Assumed icons

const StatsTestimonial = () => {
  return (
    // Right Section: Testimonial & Stats (Light background)
    <div className="hidden lg:block lg:w-2/5 p-12 bg-gray-50 border-l border-gray-200">
      
      <h3 className="text-lg font-medium text-gray-800 mb-6">Trusted by Rural Schools Across India</h3>
      
      {/* Stats Row */}
      <div className="flex justify-start space-x-12 mb-10">
        <div>
          <p className="text-3xl font-bold text-blue-600">10,000+</p>
          <p className="text-sm text-gray-500">Active Students</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">500+</p>
          <p className="text-sm text-gray-500">Rural Schools</p>
        </div>
      </div>

      {/* 🌟 Why Choose NEEV? - Top Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Choose NEEV?
              </h3>
              <div className="grid grid-cols-2 gap-10">
                
                {/* Feature 1: Offline Study */}
                <div className="flex items-start space-x-2">
                  <AcademicCapIcon className="h-6 w-6 text-[#4E7BEF]" />
                  <div>
                    <p className="font-medium text-gray-700">Offline Study</p>
                    <p className="text-sm py-0.5 text-gray-500">Access content without internet.</p>
                  </div>
                </div>
      
                {/* Feature 2: AI Assistant */}
                <div className="flex items-start space-x-3">
                  <BoltIcon className="h-6 w-6 text-[#4E7BEF]" />
                  <div>
                    <p className="font-medium text-gray-700">AI Assistant</p>
                    <p className="text-sm text-gray-500">Get instant help 24/7.</p>
                  </div>
                </div>
      
                {/* Feature 3: Progress Tracking */}
                <div className="flex items-start space-x-3">
                  <ChartBarIcon className="h-6 w-6 text-[#4E7BEF]" />
                  <div>
                    <p className="font-medium text-gray-700">Progress Tracking</p>
                    <p className="text-sm text-gray-500">Monitor your journey.</p>
                  </div>
                </div>
      
                {/* Feature 4: Multilingual */}
                <div className="flex items-start space-x-3">
                  <LanguageIcon className="h-6 w-6 text-[#4E7BEF]" />
                  <div>
                    <p className="font-medium text-gray-700">Multilingual</p>
                    <p className="text-sm text-gray-500">Learn in your language.</p>
                  </div>
                </div>
      
              </div>
            </div>
      
      
      <hr className="mb-8 border-gray-200" />

      <h3 className="text-lg font-medium text-gray-800 mb-6">What Students Say</h3>

      {/* Testimonial Card */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start mb-3">
          {/* Profile Icon/Initial */}
          <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center font-bold rounded-full text-sm mr-3">
            PS
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">Priya Sharma</p>
            <p className="text-xs text-gray-500 leading-tight">Class 10, Rajasthan</p>
          </div>
        </div>
        
        {/* Quote */}
        <p className="text-sm text-gray-600 italic leading-relaxed">
          "NEEV has completely changed how I study. The offline feature helps me learn even when there's no internet."
        </p>
      </div>
      
    </div>
  );
};

export default StatsTestimonial;