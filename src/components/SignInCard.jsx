//LOGIN PAGE//
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline'; // Assumed icon library
import { useNavigate } from "react-router-dom";

function SignInCard() {
  const [activeTab, setActiveTab] = useState('English');
   const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const tabs = ['English', 'हिन्दी', 'ਪੰਜਾਬੀ'];

  // This is the primary color used for buttons/tabs: a blue-to-purple gradient.
  const primaryGradient = 'bg-gradient-to-r from-[#4E7BEF] to-[#7B4EEF]';
  const primaryGradientHover = 'hover:from-[#3a69e7] hover:to-[#6a3ae7]';

  return (
    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Log In
      </h2>

      {/* 🌍 Language Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200
              ${activeTab === tab
                ? primaryGradient + ' text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
              }`
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔑 Login Form */}
      <form onSubmit={(e) => { e.preventDefault(); navigate("/student-dashboard"); }}>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            type="email"
            placeholder ="you@example.com"
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4E7BEF] focus:border-[#4E7BEF] transition duration-150"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="**********"
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4E7BEF] focus:border-[#4E7BEF] pr-10 transition duration-150"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Checkbox and Forgot Password */}
        <div className="flex items-center justify-between mb-8 text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#4E7BEF] border-gray-300 rounded focus:ring-[#4E7BEF]"
            />
            <label htmlFor="remember-me" className="ml-2 text-gray-600">
              Remember Me
            </label>
          </div>
          <a href="#" className="font-medium text-[#4E7BEF] hover:text-[#3a69e7]">
            Forgot Password?
          </a>
        </div>

        {/* ➡️ Sign In Button */}
        <button
          type="submit"
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-200 ${primaryGradient} ${primaryGradientHover} flex items-center justify-center`}
        >
          Sign In to Dashboard
          <span className="ml-2">→</span>
        </button>
      </form>

      {/* 🤝 Create Account Link */}
      <div className="mt-5 full flex justify-center text-sm">
        New to NEEV?{' '}
        <a href="#" className="font-medium text-[#4E7BEF] hover:text-[#3a69e7] ">
          Create an Account
        </a>
      </div>
    </div>
  );
}

export default SignInCard;