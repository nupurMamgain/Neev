// src/data/mockData.js

export const studentData = {
  // --- Header Data ---
  name: "Nupur",
  class: 10,
  
  // --- Stat Cards Data ---
  stats: [
    { title: "Total Quizzes", value: "3", icon: "📄" },
    { title: "Completed", value: "0", icon: "✅" },
    { title: "Average Score", value: "—", icon: "🎯" },
    { title: "Current Streak", value: "—", icon: "🔥" },
  ],

  // --- Daily Goal ---
  dailyGoal: "Read the next chapter of Science.",

  // --- Syllabus Progress ---
  syllabusProgress: 0, // In percentage

  // --- Upcoming Schedule ---
  schedule: [
    { date: "25", day: "Thu", task: "Science Homework Due", subject: "Biology", color: "green" },
    { date: "27", day: "Sat", task: "Mathematics Quiz", subject: "Algebra", color: "blue" },
    { date: "30", day: "Sun", task: "History Project Submission", subject: "History", color: "red" },
  ],

  // --- Recommendations ---
  recommendations: [
    { title: "Algebra Fundamentals", subject: "Math", duration: "20 minutes", difficulty: "Easy" },
    { title: "The Photosynthesis Process", subject: "Science", duration: "25 minutes", difficulty: "Medium" },
  ],

  // --- Videos (One-Shot) ---
  oneShotVideos: [
    { title: "REAL NUMBERS", subject: "Class 10 Math - Chapter 1", thumbnail: "path/to/real_numbers_thumb.jpg" },
    { title: "CHEMICAL REACTION EQUATION", subject: "Class 10 Chemistry - Chapter 1", thumbnail: "path/to/chemical_reaction_thumb.jpg" },
  ],

  // --- Badges ---
  badges: [
    { name: "Quiz Master", icon: "👑" },
    { name: "Streak Hero", icon: "✨" },
    { name: "Bookworm", icon: "📖" },
  ],

  // --- Leaderboard ---
  leaderboard: [
    { initial: "AS", name: "Anita Singh", score: "2450 pts", isCurrentUser: false },
    { initial: "RK", name: "Rahul Kumar", score: "2380 pts", isCurrentUser: false },
    { initial: "Y", name: "You", score: "1950 pts", isCurrentUser: true },
  ],
};