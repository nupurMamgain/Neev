import React from 'react';
import SignInCard from '../components/SignInCard';
import InfoCard from '../components/InfoCard';


function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10  px-4 sm:px-6 lg:px-8">
      
      {/* 🚀 Header Section (Logo and Tagline) */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2 mb-2">
         {/*<img src={logo} alt="NEEV Logo" className="h-8 w-8" />*/}
                   <h1 className="text-3xl font-bold text-[#147B6A]">NEEV</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Your foundation for a <strong>brighter future</strong>.
        </p>
      </div>

      {/* 💳 Main Content */}
      <div className="flex flex-col lg:flex-row max-w-6xl w-full space-y-8 lg:space-y-0 lg:space-x-8">
        
        {/* Left: SignIn Card */}
        <div className="w-full lg:w-5/12">
          <SignInCard />
        </div>

        {/* Right: Info Cards */}
        <div className="w-full lg:w-7/12 flex flex-col space-y-6">
          <InfoCard />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
