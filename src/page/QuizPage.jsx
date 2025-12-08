import React, { useState } from 'react';

const QuizPage = () => {
  const [quizState, setQuizState] = useState('start'); // 'start', 'loading', 'quiz', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizInfo, setQuizInfo] = useState({});
  const [error, setError] = useState(null);

  // Parse choices from string format: "a-> option || b-> option || c-> option || d-> option"
  const parseChoicesString = (choicesStr) => {
    if (!choicesStr) return [];
    const choices = choicesStr.split(' || ');
    return choices.map(choice => {
      const [key, ...textParts] = choice.split('-> ');
      return {
        key: key.trim(),
        text: textParts.join('-> ').trim()
      };
    });
  };

  // Convert options object to array format: { a: "text", b: "text", ... }
  const parseChoicesObject = (options) => {
    if (!options) return [];
    return Object.entries(options).map(([key, text]) => ({
      key: key,
      text: String(text)
    }));
  };

  // Get choices array - handles both formats
  const getChoices = (question) => {
    if (question.choices && typeof question.choices === 'string') {
      return parseChoicesString(question.choices);
    }
    if (question.options && typeof question.options === 'object') {
      return parseChoicesObject(question.options);
    }
    return [];
  };

  const fetchQuiz = async () => {
    setQuizState('loading');
    setError(null);
    
    try {
      const response = await fetch('/api/generate-mcqs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty_level: 8,
          pickle_filename: 'data.pkl'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }

      const data = await response.json();
      
      if (data.success) {
        let questionsArray = [];
        
        // Handle format 1: mcqs array with choices as string
        if (data.mcqs && Array.isArray(data.mcqs)) {
          questionsArray = data.mcqs.map(q => ({
            question_no: q.question_no,
            mcq: q.mcq,
            choices: q.choices,
            correct: q.correct
          }));
        }
        // Handle format 2: raw_quiz JSON string with options object
        else if (data.raw_quiz) {
          const quizData = JSON.parse(data.raw_quiz);
          questionsArray = Object.values(quizData).map(q => ({
            question_no: q.no || q.question_no,
            mcq: q.mcq,
            options: q.options,
            correct: q.correct
          }));
        }
        
        if (questionsArray.length > 0) {
          setQuestions(questionsArray);
          setQuizInfo({
            subject: data.subject,
            difficulty: data.difficulty_description,
            mode: data.mode
          });
          setQuizState('quiz');
        } else {
          throw new Error('No questions found in response');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Quiz fetch error:', err);
      setError(err.message);
      setQuizState('start');
    }
  };

  const handleOptionSelect = (questionNo, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionNo]: option
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.question_no] === q.correct) {
        correct++;
      }
    });
    setScore(correct);
    setQuizState('result');
  };

  const restartQuiz = () => {
    setQuizState('start');
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizInfo({});
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-emerald-500';
    if (percentage >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '🎉 Excellent! You nailed it!';
    if (percentage >= 60) return '👍 Good job! Keep practicing!';
    if (percentage >= 40) return '📚 Not bad! Room for improvement.';
    return '💪 Keep learning! You\'ll get there!';
  };

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-center text-white mb-3 tracking-tight">
              AI Knowledge Quiz
            </h1>
            <p className="text-center text-gray-300 mb-8 text-lg">
              Test your understanding with AI-generated questions
            </p>

            {/* Quiz Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-cyan-400 text-sm font-medium mb-1">Questions</div>
                <div className="text-white text-2xl font-bold">10</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-purple-400 text-sm font-medium mb-1">Difficulty</div>
                <div className="text-white text-2xl font-bold">Hard</div>
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/20 border border-rose-500/50 rounded-xl p-4 mb-6">
                <p className="text-rose-300 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              onClick={fetchQuiz}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Quiz
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Powered by AI • Based on your study materials
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (quizState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Generating Quiz</h2>
          <p className="text-gray-400">AI is preparing your questions...</p>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (quizState === 'quiz') {
    const question = questions[currentQuestion];
    const choices = getChoices(question);
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-white font-semibold">AI Quiz</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-cyan-400 font-bold">{answeredCount}</span>
              <span className="text-gray-400">/</span>
              <span className="text-white">{questions.length}</span>
              <span className="text-gray-400 text-sm ml-1">answered</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-purple-400">{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-6">
            <div className="flex items-start gap-4 mb-6">
              <span className="shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {question.question_no}
              </span>
              <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                {question.mcq}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {choices.map((choice, idx) => {
                const isSelected = selectedAnswers[question.question_no] === choice.key;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(question.question_no, choice.key)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-lg'
                          : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
                      }`}>
                        {choice.key.toUpperCase()}
                      </span>
                      <span className={`text-lg transition-colors duration-300 ${
                        isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {choice.text}
                      </span>
                      {isSelected && (
                        <svg className="w-6 h-6 text-cyan-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                currentQuestion === 0
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={calculateScore}
                disabled={answeredCount < questions.length}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  answeredCount < questions.length
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Quick Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.question_no];
                const isCurrent = idx === currentQuestion;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-10 h-10 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-lg scale-110'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  if (quizState === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl text-center">
            {/* Score Circle */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="fill-none stroke-white/10"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className={`fill-none ${percentage >= 60 ? 'stroke-cyan-400' : 'stroke-rose-400'}`}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 553} 553`}
                  style={{
                    transition: 'stroke-dasharray 1s ease-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreColor()}`}>{percentage}%</span>
                <span className="text-gray-400 text-sm mt-1">Score</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              {getScoreMessage()}
            </h1>
            <p className="text-gray-400 mb-8">
              You got <span className={`font-bold ${getScoreColor()}`}>{score}</span> out of <span className="font-bold text-white">{questions.length}</span> questions correct
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/30">
                <div className="text-3xl font-bold text-emerald-400">{score}</div>
                <div className="text-emerald-300/70 text-sm">Correct</div>
              </div>
              <div className="bg-rose-500/10 rounded-2xl p-4 border border-rose-500/30">
                <div className="text-3xl font-bold text-rose-400">{questions.length - score}</div>
                <div className="text-rose-300/70 text-sm">Incorrect</div>
              </div>
              <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">{questions.length}</div>
                <div className="text-purple-300/70 text-sm">Total</div>
              </div>
            </div>

            {/* Review Section */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left max-h-80 overflow-y-auto">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Answer Review
              </h3>
              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[q.question_no] === q.correct;
                  const choices = getChoices(q);
                  const selectedChoice = choices.find(c => c.key === selectedAnswers[q.question_no]);
                  const correctChoice = choices.find(c => c.key === q.correct);
                  
                  return (
                    <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium mb-2 line-clamp-2">{q.mcq}</p>
                          <div className="text-xs space-y-1">
                            <p className="text-gray-400">
                              Your answer: <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>{selectedChoice?.text || 'Not answered'}</span>
                            </p>
                            {!isCorrect && (
                              <p className="text-gray-400">
                                Correct answer: <span className="text-emerald-400">{correctChoice?.text}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/student-dashboard'}
                className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage;
