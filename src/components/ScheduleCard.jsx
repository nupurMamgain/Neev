// src/components/ScheduleCard.jsx
import React from 'react';

const ScheduleCard = ({ schedule, recommendations, videos }) => {
  
  // Helper to map color names to Tailwind classes
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Daily Goal */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daily Goal</h2>
        <p className="text-gray-600">Read the next chapter of Science.</p>
        <button className="mt-4 text-[#5448c8] font-medium hover:underline text-sm">
          Mark as Complete
        </button>
      </div>
      
      {/* Upcoming Schedule */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Schedule</h2>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`flex flex-col items-center justify-center p-2 rounded-lg w-12 h-12 ${colorMap[item.color]}`}>
                <span className="text-lg font-bold">{item.date}</span>
                <span className="text-xs">{item.day}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.task}</p>
                <p className="text-sm text-gray-500">{item.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((reco, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-800">{reco.title}</p>
                <button className="bg-[#5448c8] text-white px-4 py-1 text-sm rounded-full hover:bg-violet-700">
                  Start Quiz
                </button>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{reco.subject} • {reco.duration}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                  ${reco.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                >
                  {reco.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* One-Shot Videos (Partial view from image) */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">One-Shot Videos</h2>
        <div className="grid grid-cols-2 gap-4">
          {videos.slice(0, 2).map((video, index) => (
            <div key={index} className="relative cursor-pointer group">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800 leading-tight">{video.title}</p>
              <p className="text-xs text-gray-500">{video.subject}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ScheduleCard;