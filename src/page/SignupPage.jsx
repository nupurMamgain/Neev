// src/pages/SignupPage.jsx
import React from 'react';
import SignupForm from '../components/SignupForm';
import StatsTestimonial from '../components/StatsTestimonial';



const SignupPage = () => {
  return (
    // Outer container for the entire page to center the card
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      
      {/* Main White Card Container */}
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        
        {/* Render the Form Component */}
        <SignupForm />
        
        {/* Render the Stats/Testimonial Component */}
        <StatsTestimonial />

      </div>
    </div>
  );
};

export default SignupPage;