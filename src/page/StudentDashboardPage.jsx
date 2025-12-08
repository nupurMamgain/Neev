import React from 'react';
import CNavbar from "../components/CNavbar.jsx";
import StatCard from '../components/StatCard';
import SyllabusProgress from '../components/SyllabusProgress';
import ScheduleCard from '../components/ScheduleCard';
import LeaderboardCard from '../components/ClassLeaderboard';
import { studentData } from '../data/mockData';

const StudentDashboardPage = () => {
  const data = studentData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Decorative Background Elements - Commented out per request */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div> */}
      
      {/* Navbar */}
      <CNavbar name={data.name} />

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{data.name}</span>! 👋
            </h1>
            <p className="text-gray-400">Track your progress and continue your learning journey</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-500/25 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Class {data.class}
            </span>
          </div>
        </div>

        {/* Grid Layout for Dashboard Content */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>
            
            {/* Syllabus Progress */}
            <SyllabusProgress progress={data.syllabusProgress} />

            {/* One-Shot Videos */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">One-Shot Videos</h2>
                </div>
                <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.oneShotVideos.map((video, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all">
                      {/* Video Thumbnail Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all shadow-xl">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      {/* Duration badge */}
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                        15:30
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{video.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{video.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button className="group p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">Study Materials</span>
              </button>
              
              <button className="group p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Practice Tests</span>
              </button>
              
              <button className="group p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium text-white group-hover:text-emerald-300 transition-colors">My Schedule</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Daily Goal, Upcoming Schedule, Recommendations */}
            <ScheduleCard 
              schedule={data.schedule}
              recommendations={data.recommendations}
              videos={data.oneShotVideos}
            />
            
            {/* Badges and Leaderboard */}
            <LeaderboardCard 
              badges={data.badges} 
              leaderboard={data.leaderboard} 
            />
            
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all flex items-center justify-center group">
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default StudentDashboardPage;
