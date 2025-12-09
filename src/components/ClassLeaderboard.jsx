import React, { useState } from 'react';

const LeaderboardCard = ({ badges, leaderboard }) => {
  const [timeFilter, setTimeFilter] = useState('week');

  const getRankStyle = (index) => {
    if (index === 0) return 'from-amber-400 to-yellow-500';
    if (index === 1) return 'from-gray-300 to-gray-400';
    if (index === 2) return 'from-amber-600 to-orange-700';
    return 'from-gray-500 to-gray-600';
  };

  const getRankIcon = (index) => {
    if (index === 0) return '👑';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="space-y-6">
      
      {/* Badges Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-lg">🏆</span>
            </div>
            <h2 className="text-lg font-semibold text-white">Your Badges</h2>
          </div>
          <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
            View All
          </button>
        </div>
        
        <div className="flex justify-start gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className={`text-4xl mb-2 group-hover:scale-110 transition-transform ${
                index === 0 ? 'drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                index === 1 ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 
                'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
              }`}>
                {badge.icon}
              </div>
              <p className="text-xs font-medium text-gray-300 text-center">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Class Leaderboard */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Class Leaderboard</h2>
          </div>
          
          {/* Time Filter */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setTimeFilter('week')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                timeFilter === 'week' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button 
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                timeFilter === 'all' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        {/* Leaderboard List */}
        <div className="space-y-2">
          {leaderboard.map((student, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                student.isCurrentUser 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
                  : 'bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getRankStyle(index)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {typeof getRankIcon(index) === 'string' ? (
                    <span className="text-lg">{getRankIcon(index)}</span>
                  ) : (
                    getRankIcon(index)
                  )}
                </div>
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                  student.isCurrentUser 
                    ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-purple-500/30' 
                    : student.initial === 'AS' 
                    ? 'bg-gradient-to-br from-rose-400 to-red-500' 
                    : student.initial === 'RK' 
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  {student.initial}
                </div>
                
                {/* Name */}
                <div>
                  <span className={`font-medium ${student.isCurrentUser ? 'text-cyan-300' : 'text-white'}`}>
                    {student.name}
                  </span>
                  {student.isCurrentUser && (
                    <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      You
                    </span>
                  )}
                </div>
              </div>
              
              {/* Score */}
              <div className="text-right">
                <span className={`font-bold ${student.isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>
                  {student.score}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* View Full Leaderboard */}
        <button className="w-full mt-4 py-3 text-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors flex items-center justify-center gap-2 bg-white/5 rounded-xl hover:bg-white/10">
          <span>View Full Leaderboard</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LeaderboardCard;
