// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import "./App.css";

import App from "./App";
import Home from "./page/Xhome";
import LoginPage from "./page/LoginPage";
import TeacherRegisterPage from "./page/TeacherRegisterPage";
import SignupPage from "./page/SignupPage";
import StudentDashboardPage from "./page/StudentDashboardPage";
import QuizPage from "./page/QuizPage";
import ChapterPage from "./page/ChapterPage";

// IMPORTANT: Teacher Dashboard import
import TeacherDashboardPage from "./page/TeacherDashboardPage";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* PARENT LAYOUT */}
        <Route path="/" element={<App />}>
          
          {/* CHILD PAGES */}
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="student-register" element={<SignupPage />} />
          <Route path="teacher-register" element={<TeacherRegisterPage />} />
          <Route path="student-dashboard" element={<StudentDashboardPage />} />
          <Route path="quiz-page" element={<QuizPage />} />
          <Route path="chapter/:chapterId" element={<ChapterPage />} />

          {/* NEW ROUTE → Teacher Dashboard */}
          <Route path="teacher-dashboard" element={<TeacherDashboardPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
