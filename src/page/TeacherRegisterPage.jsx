// src/pages/TeacherRegisterPage.jsx
import React from 'react';
import TeacherRegisterForm from "../components/TeacherRegisterForm.jsx"; // from page/ folder


const TeacherRegisterPage = () => {
  return (
    // Set the light blue/white background and center the content
    <div className="flex justify-center items-center min-h-screen p-4" 
         style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e0e7ee 100%)' }}>
      
      {/* The main white card container */}
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Render the full form component */}
        <TeacherRegisterForm />

      </div>
    </div>
  );
};

export default TeacherRegisterPage;