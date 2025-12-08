// src/components/SyllabusProgress.jsx
import React from 'react';

const SyllabusProgress = ({ progress }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Syllabus Progress</h2>
      
      {/* Progress Bar Container */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block text-gray-600">
            You have completed just over half of your syllabus! Keep going!
          </div>
          <div className="text-right">
            <span className="text-sm font-bold inline-block text-gray-800">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${progress}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusProgress;