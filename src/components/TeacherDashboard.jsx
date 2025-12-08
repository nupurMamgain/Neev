import React from "react";
import Header from "../components/Header";
import ClassTabs from "../components/ClassTabs";
import StudentCard from "../components/StudentCard";
import PerformanceSnapshot from "../components/PerformanceSnapshot";
import Assignments from "../components/Assignments";

export default function TeacherDashboard() {
  const students = [
    { initials: "AS", name: "Aarav Sharma", percent: 92, color: "green" },
    { initials: "DM", name: "Diya Mehta", percent: 88, color: "green" },
    { initials: "RK", name: "Rohan Kapoor", percent: 75, color: "blue" },
    { initials: "PS", name: "Priya Singh", percent: 95, color: "green" },
    { initials: "AV", name: "Aniket Verma", percent: 68, color: "yellow" },
    { initials: "SP", name: "Saanvi Patel", percent: 81, color: "blue" },
    { initials: "KJ", name: "Kabir Joshi", percent: 48, color: "red" },
    { initials: "IR", name: "Ishaan Reddy", percent: 98, color: "green" },
    { initials: "MD", name: "Myra Das", percent: 89, color: "green" },
    { initials: "VK", name: "Vihaan Kumar", percent: 62, color: "yellow" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <Header />
      <ClassTabs />

      <div className="grid grid-cols-12 gap-5 mt-6">
        
        {/* LEFT SIDE */}
        <div className="col-span-8">
          <h3 className="font-semibold mb-3">
            My Class: Class 10 - Mathematics (38 Students)
          </h3>

          <div className="grid grid-cols-5 gap-4">
            {students.map((s) => (
              <StudentCard key={s.name} {...s} />
            ))}
          </div>

          <Assignments />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-4">
          <PerformanceSnapshot />
        </div>
      </div>
    </div>
  );
}