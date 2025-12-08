// src/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const iconMap = {
    "📄": "text-[#5448c8]", // Total Quizzes - Purple/Blue
    "✅": "text-green-500", // Completed - Green
    "🎯": "text-yellow-500", // Average Score - Yellow
    "🔥": "text-purple-500", // Current Streak - Light Purple
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`text-2xl ${iconMap[icon] || 'text-gray-400'}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;