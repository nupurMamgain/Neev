// src/components/TeacherRegisterForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherRegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData.entries()));

    // ✅ yahan se teacher dashboard pe bhej de
    navigate("/teacher-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef3ff] to-[#e8f6ff] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-gray-800">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[#152857] mb-6">
          Teacher Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* School */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              School
            </label>
            <input
              type="text"
              name="school"
              placeholder="Enter school name"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              placeholder="e.g. 3"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50
                         placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Register as Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegisterForm;
