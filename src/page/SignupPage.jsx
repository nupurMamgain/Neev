import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    classes: '',
    Ph_num: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.password2) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/student-registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          class_obj: formData.classes
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.detail ||
          "Signup failed. Please check the details and try again."
        );
      }

      setSuccessMsg("Account created successfully! You can now log in.");
      // thoda delay ke baad login pe bhejna ho to:
      // setTimeout(() => navigate('/login'), 1000);
      navigate('/login');

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-1">Join NEEV and start learning</p>
          </div>

          {/* 🔴 Error / 🟢 Success */}
          {errorMsg && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form  className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {/* Password validation logic */}
                {formData.password && formData.password2 && formData.password !== formData.password2 && (
                  <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                )}
                {formData.password && formData.password2 && formData.password === formData.password2 && (
                  <p className="text-green-600 text-sm mt-1">Passwords match</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm *</label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {/* Password validation logic */}
                {formData.password && formData.password2 && formData.password !== formData.password2 && (
                  <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                )}
                {formData.password && formData.password2 && formData.password === formData.password2 && (
                  <p className="text-green-600 text-sm mt-1">Passwords match</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                <select
                  name="classes"
                  value={formData.classes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="" disabled>Select class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={i+1}>Class {i+1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="Ph_num"
                  value={formData.Ph_num}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Teacher Link */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Are you a teacher?{' '}
          <Link to="/teacher-register" className="text-blue-600 hover:text-blue-700 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;