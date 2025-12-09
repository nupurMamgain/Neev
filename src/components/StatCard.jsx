import React from 'react';

const StatCard = ({ title, value, icon, trend, trendValue }) => {
  const iconConfig = {
    "📄": { gradient: "from-cyan-400 to-blue-500", shadow: "shadow-cyan-500/20", bg: "bg-cyan-500/10" },
    "✅": { gradient: "from-emerald-400 to-green-500", shadow: "shadow-emerald-500/20", bg: "bg-emerald-500/10" },
    "🎯": { gradient: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20", bg: "bg-amber-500/10" },
    "🔥": { gradient: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/20", bg: "bg-purple-500/10" },
  };

  const config = iconConfig[icon] || iconConfig["📄"];

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 overflow-hidden">
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-gray-400'
            }`}>
              {trend === 'up' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span>{trendValue || ''}</span>
            </div>
          )}
        </div>
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${config.bg} flex items-center justify-center text-3xl shadow-lg ${config.shadow} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>

      {/* Decorative line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};

export default StatCard;
