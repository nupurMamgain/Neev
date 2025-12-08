import React from 'react';
import { Link } from 'react-router-dom';

const ScheduleCard = ({ schedule, recommendations, videos }) => {
  
  const colorMap = {
    green: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
    blue: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
    red: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/30" },
  };

  return (
    <div className="space-y-6">
      {/* Daily Goal */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Daily Goal</h2>
          </div>
          
          <p className="text-gray-300 mb-4">Read the next chapter of Science.</p>
          
          <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors group/btn">
            <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mark as Complete
          </button>
        </div>
      </div>
      
      {/* Upcoming Schedule */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">Upcoming Schedule</h2>
        </div>
        
        <div className="space-y-3">
          {schedule.map((item, index) => {
            const color = colorMap[item.color] || colorMap.blue;
            return (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-3 rounded-xl ${color.bg} border ${color.border} hover:bg-white/5 transition-all cursor-pointer group`}
              >
                <div className={`flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 min-w-[50px]`}>
                  <span className={`text-xl font-bold ${color.text}`}>{item.date}</span>
                  <span className="text-xs text-gray-400">{item.day}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white group-hover:text-cyan-300 transition-colors">{item.task}</p>
                  <p className="text-sm text-gray-400">{item.subject}</p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">Recommended Quizzes</h2>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((reco, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{reco.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <span>{reco.subject}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>{reco.duration}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reco.difficulty === 'Easy' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {reco.difficulty}
                </span>
              </div>
              <Link 
                to="/quiz-page"
                className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-sm font-medium rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white">Start Quiz</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* One-Shot Videos Preview */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Quick Videos</h2>
          </div>
          <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {videos.slice(0, 2).map((video, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-video bg-white/10 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-white group-hover:text-cyan-300 transition-colors line-clamp-1">{video.title}</p>
              <p className="text-xs text-gray-500">{video.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
