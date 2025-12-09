import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboardPage = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [subjectsError, setSubjectsError] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  // Load user data and token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }
    
    setAuthToken(`Bearer ${token}`);
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, [navigate]);

  // Subject icons/colors mapping
  const subjectStyles = {
    'Maths': { icon: '📐', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100' },
    'Science': { icon: '🔬', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconBg: 'bg-green-100' },
    'English': { icon: '📚', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconBg: 'bg-purple-100' },
    'Hindi': { icon: '📖', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', iconBg: 'bg-orange-100' },
    'Social Science': { icon: '🌍', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', iconBg: 'bg-teal-100' },
    'History': { icon: '🏛️', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    'Geography': { icon: '🗺️', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
    'Economics': { icon: '💹', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', iconBg: 'bg-indigo-100' },
    'Political Science': { icon: '⚖️', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', iconBg: 'bg-rose-100' },
  };

  const getSubjectStyle = (name) => {
    return subjectStyles[name] || { icon: '📘', bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', iconBg: 'bg-gray-100' };
  };

  useEffect(() => {
    if (!authToken) return; // Wait for token to be loaded

    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }

        const result = await response.json();
        setSubjects(result.data || []);
      } catch (err) {
        setSubjectsError(err.message);
      } finally {
        setSubjectsLoading(false);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/student-analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const result = await response.json();
        setAnalytics(result);
        
        // Save avg_score to localStorage for quiz difficulty calculation
        if (result.avg_score !== undefined) {
          localStorage.setItem('avgScore', result.avg_score.toString());
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leader-board', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }

        const result = await response.json();
        setLeaderboard(Array.isArray(result) ? result : (result.data || []));
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchSubjects();
    fetchAnalytics();
    fetchLeaderboard();
  }, [authToken]);

  // Use all subjects from API (API returns user-specific subjects)
  const userSubjects = subjects;

  const handleSubjectClick = async (subjectId) => {
    // If clicking same subject, collapse it
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
      setChapters([]);
      return;
    }

    setExpandedSubject(subjectId);
    setChaptersLoading(true);
    setChapters([]);

    try {
      const response = await fetch(`/api/get-chapter-list/?subject_id=${subjectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chapters');
      }

      const result = await response.json();
      // Handle both array response and nested response
      setChapters(Array.isArray(result) ? result : (result.data || result.chapters || []));
    } catch (err) {
      console.error('Failed to fetch chapters:', err);
      setChapters([]);
    } finally {
      setChaptersLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-semibold text-gray-900">NEEV</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                {/* <Link to="/student-dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Study Materials</Link>
                <Link to="/quiz-page" className="text-gray-600 hover:text-gray-900">Quizzes</Link> */}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user?.name || 'Student'}</span>
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">{user?.name?.charAt(0) || 'S'}</span>
              </div>
              <button
                onClick={() => {
                  // Clear all localStorage data
                  localStorage.removeItem('token');
                  localStorage.removeItem('refreshToken');
                  localStorage.removeItem('user');
                  localStorage.removeItem('loginResponse');
                  localStorage.removeItem('avgScore');
                  // Redirect to home page
                  navigate('/');
                }}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name || 'Student'}! 👋</h1>
            <p className="text-gray-500 mt-1">Track your progress and continue learning</p>
          </div>
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
            Class {analytics?.class_obj || '—'}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analyticsLoading ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-24"></div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{analytics?.total_chapters || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Chapters</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">✅</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">{analytics?.attempted_chapters || 0}</p>
                    <p className="text-sm text-gray-500 mt-1">Attempted</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <p className="text-2xl font-semibold text-blue-600">{analytics?.avg_score ? `${analytics.avg_score}%` : '—'}</p>
                    <p className="text-sm text-gray-500 mt-1">Average Score</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">Class {analytics?.class_obj || '—'}</p>
                    <p className="text-sm text-gray-500 mt-1">Your Class</p>
                  </div>
                </>
              )}
            </div>

            {/* Subjects Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Your Subjects</h2>
                <span className="text-sm text-gray-500">Class {analytics?.class_obj || '—'}</span>
              </div>
              
              {subjectsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-100 rounded-xl p-4 h-24"></div>
                    </div>
                  ))}
                </div>
              ) : userSubjects.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-3 block">📚</span>
                  <p className="text-gray-500 text-sm">No subjects found for your class</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userSubjects.map((subject) => {
                      const style = getSubjectStyle(subject.name);
                      const isExpanded = expandedSubject === subject.id;
                      return (
                        <button
                          key={subject.id}
                          onClick={() => handleSubjectClick(subject.id)}
                          className={`group text-left ${style.bg} ${style.border} border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${isExpanded ? 'ring-2 ring-blue-500 shadow-md' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                              <span className="text-xl">{style.icon}</span>
                            </div>
                            <svg 
                              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <h3 className={`font-medium ${style.text} text-sm`}>{subject.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">Class {subject.class_obj}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Expanded Chapters Section */}
                  {expandedSubject && (
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-5 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <span className="text-lg">📖</span>
                          Chapters - {userSubjects.find(s => s.id === expandedSubject)?.name}
                        </h3>
                        <button 
                          onClick={() => { setExpandedSubject(null); setChapters([]); }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {chaptersLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-lg p-4 h-20"></div>
                          ))}
                        </div>
                      ) : chapters.length === 0 ? (
                        <div className="text-center py-6">
                          <span className="text-3xl mb-2 block">📭</span>
                          <p className="text-gray-500 text-sm">No chapters available yet</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {chapters.map((chapter, index) => (
                            <Link
                              key={chapter.id || index}
                              to={`/chapter/${chapter.id}?subject=${expandedSubject}&chapterName=${encodeURIComponent(chapter.name || chapter.title || chapter.chapter_name || '')}&subjectName=${encodeURIComponent(userSubjects.find(s => s.id === expandedSubject)?.name || '')}`}
                              className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                                    {chapter.name || chapter.title || chapter.chapter_name}
                                  </h4>
                                  {chapter.description && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{chapter.description}</p>
                                  )}
                                </div>
                                <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Videos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">One-Shot Videos</h2>
              <div className="text-center py-8">
                <span className="text-4xl mb-3 block">🎬</span>
                <p className="text-gray-500 text-sm">Videos coming soon!</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Leaderboard</h2>
                <span className="text-xl">🏆</span>
              </div>
              
              {leaderboardLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-6">
                  <span className="text-3xl mb-2 block">🏅</span>
                  <p className="text-gray-500 text-sm">No leaderboard data yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map((student, index) => {
                    const rankStyles = {
                      0: 'bg-yellow-50 border border-yellow-200',
                      1: 'bg-gray-100 border border-gray-300',
                      2: 'bg-amber-50 border border-amber-200',
                    };
                    const rankIcons = { 0: '🥇', 1: '🥈', 2: '🥉' };
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg ${rankStyles[index] || 'bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-semibold text-gray-600">
                            {rankIcons[index] || index + 1}
                          </span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            index === 0 ? 'bg-yellow-200 text-yellow-800' : 
                            index === 1 ? 'bg-gray-300 text-gray-700' : 
                            index === 2 ? 'bg-amber-200 text-amber-800' : 
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {student.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="font-medium text-gray-900 truncate max-w-[120px]">{student.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{student.total_score} pts</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Quizzes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Quick Quizzes</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/quiz-page?chapter=3&subject=1&chapterName=Linear%20Equations&subjectName=Maths"
                  className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📐</span>
                  </div>
                  <h3 className="font-medium text-blue-700 text-sm">Maths</h3>
                  <p className="text-xs text-gray-500 mt-1">10 Questions</p>
                </Link>
                
                <Link 
                  to="/quiz-page?chapter=4&subject=3&chapterName=Democratic%20Politics&subjectName=Political%20Science"
                  className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-medium text-purple-700 text-sm">Political Science</h3>
                  <p className="text-xs text-gray-500 mt-1">10 Questions</p>
                </Link>
                
                <Link 
                  to="/quiz-page?chapter=16&subject=16&chapterName=Physical%20Features&subjectName=Geography"
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <h3 className="font-medium text-emerald-700 text-sm">Geography</h3>
                  <p className="text-xs text-gray-500 mt-1">10 Questions</p>
                </Link>
                
                <Link 
                  to="/quiz-page?chapter=2&subject=2&chapterName=Village%20Palampur&subjectName=Social%20Science"
                  className="p-4 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="font-medium text-teal-700 text-sm">Social Science</h3>
                  <p className="text-xs text-gray-500 mt-1">10 Questions</p>
                </Link>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Daily Goal</h2>
              <p className="text-gray-600 mb-4">Complete at least one chapter today! 📚</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Mark as Complete ✓
              </button>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Upcoming</h2>
              <div className="text-center py-6">
                <span className="text-3xl mb-2 block">📅</span>
                <p className="text-gray-500 text-sm">No upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/student-dashboard" 
            className="flex flex-col items-center py-2 px-4 text-blue-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          
          <Link 
            to="/quiz-page" 
            className="flex flex-col items-center py-2 px-4 text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-xs mt-1">Quiz</span>
          </Link>
          
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              localStorage.removeItem('loginResponse');
              localStorage.removeItem('avgScore');
              navigate('/');
            }}
            className="flex flex-col items-center py-2 px-4 text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default StudentDashboardPage;
