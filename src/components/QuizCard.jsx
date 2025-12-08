//QUIZ START HONE KE OPTION//
import React from 'react';

const QuizCard = ({ subject, topic, time, difficulty, color, showRecommendation, showButton }) => {
  return (
    <div className={`border ${color} rounded-lg p-4 mb-4`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg mb-1">{topic}</h3>
          <p className="text-gray-700">
            {subject} - {time} - 
            <span className={`font-medium ${difficulty === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
              {difficulty}
            </span>
          </p>
          {showRecommendation && (
            <p className="text-gray-600 mt-2">
              Recommendation: Based on your recent study of linear equations, this quiz will help reinforce your understanding.
            </p>
          )}
        </div>
        {showButton && (
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md font-medium hover:bg-blue-700 transition">
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;