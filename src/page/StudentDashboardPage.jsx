// src/pages/StudentDashboardPage.jsx
import React from 'react';
import CNavbar from "../components/CNavbar.jsx";
import StatCard from '../components/StatCard';
import SyllabusProgress from '../components/SyllabusProgress';
import ScheduleCard from '../components/ScheduleCard';
import LeaderboardCard from '../components/ClassLeaderboard';
import { studentData } from '../data/mockData';

const StudentDashboardPage = () => {
  const data = studentData; // Use the mock data

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Navbar */}
      <CNavbar name={data.name} />

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {data.name}! 👋
          </h1>
          <span className="bg-[#5448c8] text-white px-4 py-2 rounded-lg font-medium shadow-md">
            Class {data.class}
          </span>
        </div>

        {/* --- Grid Layout for Dashboard Content --- */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (Spans 8 columns on large screens) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* 2.1 Stat Cards (4 cards, span 3 columns each) */}
            <div className="grid grid-cols-4 gap-6">
              {data.stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>
            
            {/* 2.2 Syllabus Progress (Spans full width of the left column) */}
            <SyllabusProgress progress={data.syllabusProgress} />

            {/* 2.3 One-Shot Videos (Rendered via ScheduleCard for simplicity) */}
            {/* You would likely move the One-Shot Videos into its own component in a real app */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">One-Shot Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.oneShotVideos.map((video, index) => (
                      <div key={index} className="relative cursor-pointer group">
                          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative border border-gray-100 shadow-sm">
                              {/* Video Thumbnail Placeholder */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-100">
                                  <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                              </div>
                          </div>
                          <p className="mt-2 text-base font-bold text-gray-800 leading-tight">{video.title}</p>
                          <p className="text-xs text-gray-500">{video.subject}</p>
                      </div>
                  ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Spans 4 columns on large screens) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Daily Goal, Upcoming Schedule, Recommendations */}
            <ScheduleCard 
              schedule={data.schedule}
              recommendations={data.recommendations}
              videos={data.oneShotVideos} // Passing videos here as well for full rendering
            />
            
            {/* Badges aur Leaderboard */}
            <LeaderboardCard 
              badges={data.badges} 
              leaderboard={data.leaderboard} 
            />
            
            {/* The Floating Plus Button */}
            <button className="fixed bottom-8 right-8 bg-[#5448c8] text-white p-4 rounded-full shadow-lg hover:bg-violet-700 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;