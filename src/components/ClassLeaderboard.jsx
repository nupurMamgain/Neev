// src/components/ClassLeaderboard.jsx
import React from 'react';

const LeaderboardCard = ({ badges, leaderboard }) => {
  return (
    <div className="space-y-6">
      
      {/* Badges Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Badges 🏆</h2>
          <button className="text-[#5448c8] text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="flex justify-start space-x-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl p-2 rounded-full mb-1 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-purple-500' : 'text-blue-500'}`}>
                {badge.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Class Leaderboard */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Class Leaderboard</h2>
          <div className="text-sm flex space-x-2">
            <span className="font-bold text-gray-800 border-b-2 border-gray-800">This Week</span>
            <span className="text-gray-500 hover:text-gray-800 cursor-pointer">All Time</span>
          </div>
        </div>
        
        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboard.map((student, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg ${student.isCurrentUser ? 'bg-[#5448c8]/10 border border-[#5448c8]' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-semibold w-5 text-center">{index + 1}</span>
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-sm 
                    ${student.initial === 'AS' ? 'bg-red-500' : student.initial === 'RK' ? 'bg-green-500' : student.isCurrentUser ? 'bg-[#5448c8]' : 'bg-gray-400'}`}
                >
                  {student.initial}
                </div>
                <span className="font-medium text-gray-800">{student.name}</span>
              </div>
              <span className="font-semibold text-gray-700">{student.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;