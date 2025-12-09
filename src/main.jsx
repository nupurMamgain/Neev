import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"
import "./App.css"
import App from "./App";
import Home from "./page/Xhome";
import LoginPage from "./page/LoginPage";
import TeacherRegisterPage from "./page/TeacherRegisterPage";
import SignupPage from "./page/SignupPage"
import StudentDashboardPage from "./page/StudentDashboardPage";
import QuizPage from "./page/QuizPage";
import ChapterPage from "./page/ChapterPage"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="student-register" element={<SignupPage/>} />
          <Route path="teacher-register" element={<TeacherRegisterPage />} />
          <Route path="student-dashboard" element={<StudentDashboardPage />} />
          <Route path="quiz-page" element={<QuizPage />} />
          <Route path="chapter/:chapterId" element={<ChapterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
