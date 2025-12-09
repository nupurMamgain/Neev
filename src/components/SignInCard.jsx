//LOGIN PAGE//
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline'; // Assumed icon library
import { useNavigate } from "react-router-dom";

function SignInCard() {
  const [activeTab, setActiveTab] = useState('English');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs = ['English', 'हिन्दी', 'ਪੰਜਾਬੀ'];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || data.detail || 'Login failed');
      }

      // Clear any existing auth data first
      localStorage.removeItem('loginResponse');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Save entire response to localStorage
      localStorage.setItem('loginResponse', JSON.stringify(data));
      console.log('Saved loginResponse');
      
      // Save access token
      if (data.access) {
        localStorage.setItem('token', data.access);
        console.log('Saved access token');
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Saved token');
      }
      
      // Save refresh token
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
        console.log('Saved refresh token');
      }
      
      // Save user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Saved user:', data.user);
      }

      // Verify data was saved
      console.log('Stored token:', localStorage.getItem('token'));
      console.log('Stored user:', localStorage.getItem('user'));

      // Navigate to dashboard on success
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      <form onSubmit={handleLogin}>
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4E7BEF] focus:border-[#4E7BEF] transition duration-150"
            required
            disabled={loading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#4E7BEF] focus:border-[#4E7BEF] pr-10 transition duration-150"
              required
              disabled={loading}
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
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-200 ${primaryGradient} ${primaryGradientHover} flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </>
          ) : (
            <>
              Sign In to Dashboard
              <span className="ml-2">→</span>
            </>
          )}
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