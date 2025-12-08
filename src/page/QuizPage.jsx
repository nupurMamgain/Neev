import React from 'react';
import QuizCard from '../components/QuizCard';

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Interactive Quizzes</h1>
        
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Algebra Fundamentals</h2>
        <QuizCard
          subject="Math"
          topic="Algebra Fundamentals"
          time="20 minutes"
          color="border-gray-300 shadow-xl bg-white text-black"
          showRecommendation={true}
          showButton={true}
        />
        
        <div className="border-t border-gray-50 my-6 pt-6 ">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Photosynthesis Process</h2>
          <QuizCard
            subject="Science"
            topic="Photosynthesis Process"
            time="25 minutes"
            color="border-gray-300 shadow-xl bg-white text-black p-10 "
            showRecommendation={false}
            showButton={true}
          />
        </div>
        
        <h2 className="text-2xl font-bold border-gray-50 text-gray-700 mb-4 ">Grammar Essentials</h2>
        <QuizCard
          subject="English"
          topic="Grammar Essentials"
          time="22 minutes"
          color="border-gray-300 shadow-xl bg-white text-black p-10"
          showRecommendation={false}
          showButton={true}
        />
      </div>
    </div>
  );
};

export default QuizPage;