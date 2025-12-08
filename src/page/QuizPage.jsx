import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  const [quizState, setQuizState] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  const parseChoicesString = (choicesStr) => {
    if (!choicesStr) return [];
    const choices = choicesStr.split(' || ');
    return choices.map(choice => {
      const [key, ...textParts] = choice.split('-> ');
      return { key: key.trim(), text: textParts.join('-> ').trim() };
    });
  };

  const parseChoicesObject = (options) => {
    if (!options) return [];
    return Object.entries(options).map(([key, text]) => ({ key, text: String(text) }));
  };

  const getChoices = (question) => {
    if (question.choices && typeof question.choices === 'string') return parseChoicesString(question.choices);
    if (question.options && typeof question.options === 'object') return parseChoicesObject(question.options);
    return [];
  };

  const fetchQuiz = async () => {
    setQuizState('loading');
    setError(null);
    try {
      const response = await fetch('/api/generate-mcqs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty_level: 8, pickle_filename: 'data.pkl' }),
      });
      if (!response.ok) throw new Error('Failed to fetch quiz');
      const data = await response.json();
      
      if (data.success) {
        let questionsArray = [];
        if (data.mcqs && Array.isArray(data.mcqs)) {
          questionsArray = data.mcqs.map(q => ({
            question_no: q.question_no, mcq: q.mcq, choices: q.choices, correct: q.correct
          }));
        } else if (data.raw_quiz) {
          const quizData = JSON.parse(data.raw_quiz);
          questionsArray = Object.values(quizData).map(q => ({
            question_no: q.no || q.question_no, mcq: q.mcq, options: q.options, correct: q.correct
          }));
        }
        if (questionsArray.length > 0) {
          setQuestions(questionsArray);
          setQuizState('quiz');
        } else throw new Error('No questions found');
      } else throw new Error('Invalid response');
    } catch (err) {
      setError(err.message);
      setQuizState('start');
    }
  };

  const handleOptionSelect = (questionNo, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionNo]: option }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => { if (selectedAnswers[q.question_no] === q.correct) correct++; });
    setScore(correct);
    setQuizState('result');
  };

  const restartQuiz = () => {
    setQuizState('start');
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
  };

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link to="/student-dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">AI Knowledge Quiz</h1>
            <p className="text-gray-500 mb-6">Test your understanding with AI-generated questions</p>
            
            <div className="flex justify-center gap-8 mb-6 text-sm">
              <div><p className="text-2xl font-semibold text-gray-900">10</p><p className="text-gray-500">Questions</p></div>
              <div><p className="text-2xl font-semibold text-gray-900">Hard</p><p className="text-gray-500">Difficulty</p></div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button onClick={fetchQuiz} className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading
  if (quizState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Generating quiz...</p>
        </div>
      </div>
    );
  }

  // Quiz
  if (quizState === 'quiz') {
    const question = questions[currentQuestion];
    const choices = getChoices(question);
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-500">{answeredCount} answered</span>
          </div>

          {/* Progress */}
          <div className="h-2 bg-gray-200 rounded-full mb-8">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-semibold shrink-0">
                {question.question_no}
              </span>
              <h2 className="text-lg font-medium text-gray-900">{question.mcq}</h2>
            </div>

            <div className="space-y-3">
              {choices.map((choice, idx) => {
                const isSelected = selectedAnswers[question.question_no] === choice.key;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(question.question_no, choice.key)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {choice.key.toUpperCase()}
                      </span>
                      <span className="text-gray-700">{choice.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={calculateScore}
                disabled={answeredCount < questions.length}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result
  if (quizState === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-3xl font-bold ${
                percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>{percentage}%</span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {percentage >= 70 ? 'Great job! 🎉' : percentage >= 50 ? 'Good effort! 👍' : 'Keep practicing! 💪'}
            </h1>
            <p className="text-gray-500 mb-6">You got {score} out of {questions.length} questions correct</p>

            <div className="flex justify-center gap-4 mb-6">
              <div className="px-4 py-2 bg-green-50 rounded-lg"><span className="text-green-600 font-semibold">{score}</span><span className="text-gray-500 text-sm ml-1">Correct</span></div>
              <div className="px-4 py-2 bg-red-50 rounded-lg"><span className="text-red-600 font-semibold">{questions.length - score}</span><span className="text-gray-500 text-sm ml-1">Wrong</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={restartQuiz} className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
                Try Again
              </button>
              <Link to="/student-dashboard" className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 text-center">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage;
