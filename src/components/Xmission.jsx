import React from "react";
import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded-full mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Bridging the Educational Gap
            </h2>
            <p className="text-gray-600 mb-6">
              Our mission is to bridge the educational gap by providing high-quality, 
              accessible, and personalized learning tools to every student in rural India.
            </p>
            <p className="text-gray-600 mb-8">
              We believe that technology can unlock a world of opportunities, and we are 
              dedicated to ensuring no child is left behind.
            </p>
            <Link 
              to="/student-register"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Join Us Today
            </Link>
          </div>

          {/* Right - Stats */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Impact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                <p className="text-3xl font-bold text-blue-600">10K+</p>
                <p className="text-gray-500 text-sm mt-1">Students Empowered</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                <p className="text-3xl font-bold text-green-600">500+</p>
                <p className="text-gray-500 text-sm mt-1">Schools Reached</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                <p className="text-3xl font-bold text-purple-600">50K+</p>
                <p className="text-gray-500 text-sm mt-1">Lessons Completed</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                <p className="text-3xl font-bold text-orange-600">95%</p>
                <p className="text-gray-500 text-sm mt-1">Satisfaction Rate</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-gray-700 text-sm italic">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <p className="text-blue-600 text-sm mt-2 font-medium">— Nelson Mandela</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
