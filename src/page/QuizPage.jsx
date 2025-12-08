import React from 'react';
import QuizCard from '../components/QuizCard';

const QuizSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Interactive Quizzes</h1>
        
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Algebra Fundamentals</h2>
        <QuizCard
          subject="Math"
          topic="Algebra Fundamentals"
          time="20 minutes"
          difficulty="Easy"
          color="border-blue-200 bg-blue-50"
          showRecommendation={true}
          showButton={false}
        />
        
        <div className="border-t border-gray-300 my-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Photosynthesis Process</h2>
          <QuizCard
            subject="Science"
            topic="Photosynthesis Process"
            time="25 minutes"
            difficulty="Medium"
            color="border-green-200 bg-green-50"
            showRecommendation={false}
            showButton={true}
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Grammar Essentials</h2>
        <QuizCard
          subject="English"
          topic="Grammar Essentials"
          time="22 minutes"
          difficulty="Easy"
          color="border-purple-200 bg-purple-50"
          showRecommendation={false}
          showButton={true}
        />
      </div>
    </div>
  );
};

export default QuizSection;