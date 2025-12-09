import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-6">
            Soon to be available in 3 languages
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Education for Every Child, Everywhere
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            NEEV brings quality digital learning to children in rural areas. 
            Learn offline, get AI-powered support, and break down educational barriers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/student-register"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Start Learning Free
            </Link>
            <a 
              href="#features"
              className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">10K+</p>
              <p className="text-gray-500">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-gray-500">Schools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">95%</p>
              <p className="text-gray-500">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
