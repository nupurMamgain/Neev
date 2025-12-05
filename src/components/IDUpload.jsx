// src/components/common/IDUpload.jsx
import React from 'react';

const IDUpload = () => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">
        Verify ID Card
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center transition duration-300 ease-in-out hover:border-purple-400">
        <div className="flex justify-center mb-2">
          {/* SVG for the upload icon (or use a simple text icon) */}
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
          </svg>
        </div>
        <p className="text-sm">
          <span className="text-purple-600 font-semibold cursor-pointer hover:text-purple-700">
            Upload your ID
          </span> 
          {' '}or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG, PDF up to 10MB
        </p>
        <input type="file" className="hidden" accept=".png, .jpg, .jpeg, .pdf" />
      </div>
    </div>
  );
};

export default IDUpload;