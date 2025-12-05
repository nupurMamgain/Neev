import React from 'react';
import { AcademicCapIcon, BoltIcon, LanguageIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Assumed icons

function InfoCard() {
  const primaryGradient = 'bg-gradient-to-r from-[#4E7BEF] to-[#7B4EEF]';
  const primaryGradientHover = 'hover:from-[#3a69e7] hover:to-[#6a3ae7]';

  return (
    <>
      {/* 🌟 Why Choose NEEV? - Top Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Why Choose NEEV?
        </h3>
        <div className="grid grid-cols-2 gap-4">
          
          {/* Feature 1: Offline Study */}
          <div className="flex items-start space-x-3">
            <AcademicCapIcon className="h-6 w-6 text-[#4E7BEF]" />
            <div>
              <p className="font-medium text-gray-700">Offline Study</p>
              <p className="text-sm text-gray-500">Access content without internet.</p>
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

     

      {/* 🌟 Are you a Teacher? - Bottom Card */}
     <div className="bg-white p-6 rounded-xl shadow-lg text-center">

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Are you a Teacher? Join Us
        </h3>
        <p className="text-gray-600 mb-6">
          Become a part of NEEV and empower learners. Share your expertise and grow with our community.
        </p>
        <button
          className="w-4/5 py-3 text-lg font-semibold text-[#4E7BEF] border border-[#4E7BEF] rounded-lg shadow-sm hover:bg-[#EEF2FF] transition duration-200"
        >
          Apply to Teach
        </button>
        <p className="text-xs text-gray-500 mt-4">
          We review applications within 24-48 hours and email your login credentials.
        </p>
      </div>
    </>
  );
}

export default InfoCard;