import React from 'react';
import { Link } from 'react-router-dom';
import { studentData } from '../data/mockData';

const StudentDashboardPage = () => {
  const data = studentData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-semibold text-gray-900">NEEV</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <Link to="/student-dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Study Materials</Link>
                <Link to="/quiz-page" className="text-gray-600 hover:text-gray-900">Quizzes</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{data.name}</span>
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">{data.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {data.name}! 👋</h1>
            <p className="text-gray-500 mt-1">Track your progress and continue learning</p>
          </div>
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
            Class {data.class}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Syllabus Progress</h2>
                <span className="text-2xl font-semibold text-blue-600">{data.syllabusProgress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${data.syllabusProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-3">Keep going! You're making great progress.</p>
            </div>

            {/* Videos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">One-Shot Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.oneShotVideos.map((video, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-gray-700 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.subject}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Daily Goal */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Daily Goal</h2>
              <p className="text-gray-600 mb-4">{data.dailyGoal}</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Mark as Complete ✓
              </button>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {data.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center min-w-[40px]">
                      <p className="text-lg font-semibold text-gray-900">{item.date}</p>
                      <p className="text-xs text-gray-500">{item.day}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.task}</p>
                      <p className="text-sm text-gray-500">{item.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recommended Quizzes</h2>
              <div className="space-y-3">
                {data.recommendations.map((reco, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{reco.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reco.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {reco.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{reco.subject} • {reco.duration}</p>
                    <Link 
                      to="/quiz-page"
                      className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Quiz
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Leaderboard</h2>
              <div className="space-y-2">
                {data.leaderboard.map((student, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      student.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-medium text-gray-500">{index + 1}</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {student.initial}
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{student.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
