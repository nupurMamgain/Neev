import React from 'react';

const SyllabusProgress = ({ progress }) => {
  const getProgressColor = () => {
    if (progress >= 75) return 'from-emerald-400 to-green-500';
    if (progress >= 50) return 'from-cyan-400 to-blue-500';
    if (progress >= 25) return 'from-amber-400 to-orange-500';
    return 'from-purple-400 to-pink-500';
  };

  const getMessage = () => {
    if (progress >= 75) return "Amazing! You're almost there! 🚀";
    if (progress >= 50) return "Great progress! Keep up the momentum! 💪";
    if (progress >= 25) return "Good start! Stay consistent! 📚";
    return "Let's begin your learning journey! ✨";
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Syllabus Progress</h2>
            <p className="text-sm text-gray-400">{getMessage()}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold bg-gradient-to-r ${getProgressColor()} bg-clip-text text-transparent`}>
            {progress}%
          </span>
          <p className="text-xs text-gray-500">completed</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Milestones */}
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span className={progress >= 0 ? 'text-white' : ''}>Start</span>
          <span className={progress >= 25 ? 'text-cyan-400' : ''}>25%</span>
          <span className={progress >= 50 ? 'text-cyan-400' : ''}>50%</span>
          <span className={progress >= 75 ? 'text-cyan-400' : ''}>75%</span>
          <span className={progress >= 100 ? 'text-emerald-400' : ''}>Complete</span>
        </div>
      </div>
    </div>
  );
};

export default SyllabusProgress;
