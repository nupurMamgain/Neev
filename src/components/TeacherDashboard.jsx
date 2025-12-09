// src/components/TeacherDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  AlertTriangle,
  FileText,
  TrendingDown,
  TrendingUp,
  Search,
  Filter,
  MessageCircle,
  Phone,
  X,
  CheckCircle,
  Clock,
  User,
  BookOpen,
  Activity,
  Send,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Mock Initial Data ---

const INITIAL_STUDENTS = [
  { id: 1, name: "Akshay Sharma", roll: "10A-01", attendance: 1, marks: 55, pending: 3, status: "Critical", lastActive: "2 days ago", behavior: "⚠️" },
  { id: 2, name: "prabhat kumar", roll: "10A-02", attendance: 2, marks: 88, pending: 0, status: "critical", lastActive: "10 mins ago", behavior: "👍" },
  { id: 3, name: "Asmita Malhotra", roll: "10A-03", attendance: 4, marks: 62, pending: 2, status: "normal", lastActive: "4 hours ago", behavior: "👍" },
  { id: 4, name: "Nupur Mamgain", roll: "10A-04", attendance: 1, marks: 94, pending: 0, status: "critical", lastActive: "1 hour ago", behavior: "👍" },
  { id: 5, name: "Ananya", roll: "10A-05", attendance: 0, marks: 38, pending: 5, status: "Critical", lastActive: "5 days ago", behavior: "⚠️" },
];

const INITIAL_ALERTS = [
  { id: 1, type: "critical", message: "Akshay Sharma: Attendance dropped below 70%", time: "2 hours ago" },
  { id: 2, type: "warning", message: "3 Students failed the Unit 4 Maths Test", time: "4 hours ago" },
  { id: 3, type: "info", message: 'Assignment "Physics Laws" due tomorrow (14 pending)', time: "5 hours ago" },
];

const INITIAL_ACTIVITY = [
  { id: 1, user: "prabhat kumar", action: "submitted Science Assignment 2", time: "10:30 AM" },
  { id: 2, user: "System", action: "Rahul's Maths Score updated: 32/100", time: "10:18 AM" },
  { id: 3, user: "Admin", action: "Meeting scheduled for Aman (Behavior)", time: "09:55 AM" },
  { id: 4, user: "Nupur Mamgain", action: "posted in Class Forum", time: "09:15 AM" },
];

const STUDENT_PERFORMANCE_DATA = [
  { month: "Jan", marks: 65, avg: 70 },
  { month: "Feb", marks: 62, avg: 72 },
  { month: "Mar", marks: 55, avg: 71 },
  { month: "Apr", marks: 58, avg: 73 },
  { month: "May", marks: 45, avg: 74 },
];

const INITIAL_NOTES = [
  { id: 101, type: "negative", text: "Disruptive in History Class", author: "Mr. Johnson", time: "Yesterday" },
  { id: 102, type: "positive", text: "Homework Improved significantly", author: "Mrs. Das", time: "Dec 4" },
];

// --- Small UI Components ---

const StatCard = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs">
      {trend === "down" ? (
        <span className="text-red-500 flex items-center font-semibold bg-red-50 px-1.5 py-0.5 rounded mr-2">
          <TrendingDown size={12} className="mr-1" /> -12%
        </span>
      ) : trend === "up" ? (
        <span className="text-red-500 flex items-center font-semibold bg-red-50 px-1.5 py-0.5 rounded mr-2">
          <TrendingUp size={12} className="mr-1" /> +5%
        </span>
      ) : null}
      <span className="text-slate-400">{subtext}</span>
    </div>
  </div>
);

const RiskBadge = ({ status }) => {
  const styles = {
    Critical: "bg-red-100 text-red-700 border-red-200",
    Watch: "bg-amber-100 text-amber-700 border-amber-200",
    Normal: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Top: "bg-indigo-100 text-indigo-700 border-indigo-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Normal}`}>
      {status}
    </span>
  );
};

const StudentModal = ({ student, onClose, notes, onAddNote }) => {
  const [newNote, setNewNote] = useState("");

  if (!student) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    onAddNote({
      id: Date.now(),
      type: "neutral",
      text: newNote,
      author: "You",
      time: "Just now",
    });
    setNewNote("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold border-2 border-indigo-200">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{student.name}</h2>
              <p className="text-slate-500 text-sm flex items-center gap-2">
                Roll: {student.roll} • Class 10-A • <RiskBadge status={student.status} />
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-blue-600 text-xs font-bold uppercase">Avg Marks</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{student.marks}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <p className="text-purple-600 text-xs font-bold uppercase">Attendance</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{student.attendance}%</p>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Phone size={16} /> Contact Actions
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  <MessageCircle size={16} /> Message Parent
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Phone size={16} /> Call Guardian
                </button>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText size={16} /> Pending Work
              </h4>
              <ul className="text-sm space-y-3">
                <li className="flex items-start gap-2 text-red-600">
                  <Clock size={16} className="shrink-0 mt-0.5" />
                  <span className="font-medium">Maths Worksheet 4 (Late)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <Clock size={16} className="shrink-0 mt-0.5" />
                  <span>Science Lab Report</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Performance Trend</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={STUDENT_PERFORMANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" name="Student Score" dataKey="marks" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" name="Class Avg" dataKey="avg" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col h-80">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Teacher Notes</h3>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {notes.map((note) => (
                  <div key={note.id} className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        note.type === "negative"
                          ? "bg-red-100 text-red-600"
                          : note.type === "positive"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {note.type === "negative" ? (
                        <AlertTriangle size={20} />
                      ) : note.type === "positive" ? (
                        <CheckCircle size={20} />
                      ) : (
                        <MessageCircle size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{note.text}</p>
                      <p className="text-xs text-slate-500 mb-1">
                        {note.time} • By {note.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative border-t pt-4 mt-auto">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a quick note..."
                  className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                />
                <button
                  onClick={handleAddNote}
                  className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function TeacherDashboard() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [activityLog, setActivityLog] = useState(INITIAL_ACTIVITY);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Interactive State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [riskFilter, setRiskFilter] = useState("All");
  const [pdfReady, setPdfReady] = useState(false);

  // Load PDF libs
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
      .then(() =>
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js")
      )
      .then(() => setPdfReady(true))
      .catch((err) => console.error("Failed to load PDF libs", err));
  }, []);

  // Simulated Live Activity
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["submitted English HW", "logged in", "viewed Report Card", "posted a question"];
      const randomStudent = students[Math.floor(Math.random() * students.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      const newActivity = {
        id: Date.now(),
        user: randomStudent.name,
        action: randomAction,
        time: "Just now",
      };

      setActivityLog((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [students]);

  const handleDismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = riskFilter === "All" || student.status === riskFilter;
        return matchesSearch && matchesRisk;
      }),
    [students, searchTerm, riskFilter]
  );

  const stats = {
    total: students.length,
    lowAttendance: students.filter((s) => s.attendance < 75).length,
    critical: students.filter((s) => s.status === "Critical").length,
    pending: students.reduce((acc, s) => acc + s.pending, 0),
  };

  const handleGenerateReport = () => {
    if (!pdfReady || !window.jspdf) {
      alert("Report Generator is initializing... please wait a moment.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Class 6-A Monitoring Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${date}`, 14, 30);
    doc.text(`Filter Status: ${riskFilter}`, 14, 35);

    doc.setFillColor(241, 245, 249);
    doc.rect(14, 45, 182, 25, "F");

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text("SUMMARY OVERVIEW", 18, 53);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`${filteredStudents.length}`, 18, 62);
    doc.setFontSize(9);
    doc.text("Students Listed", 18, 67);

    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38);
    doc.text(`${filteredStudents.filter((s) => s.status === "Critical").length}`, 60, 62);
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("Critical Status", 60, 67);

    doc.setFontSize(14);
    doc.setTextColor(234, 88, 12);
    doc.text(`${filteredStudents.filter((s) => s.attendance < 75).length}`, 100, 62);
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("Low Attendance", 100, 67);

    const tableColumn = ["Roll No", "Student Name", "Attendance", "Avg Marks", "Pending", "Risk Status"];
    const tableRows = [];

    filteredStudents.forEach((student) => {
      const row = [
        student.roll,
        student.name,
        `${student.attendance}%`,
        `${student.marks}%`,
        student.pending > 0 ? `${student.pending} pending` : "None",
        student.status,
      ];
      tableRows.push(row);
    });

    if (doc.autoTable) {
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 80,
        theme: "grid",
        headStyles: { fillColor: [79, 70, 229] },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        styles: { fontSize: 10, cellPadding: 3 },
      });
      doc.save(`Class_10A_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } else {
      alert("Error generating table. Please try reloading the page.");
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount} - Generated by NEEV-VISION `, 105, 287, {
        align: "center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-20 lg:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg">E</div>
          <span className="font-bold text-xl hidden lg:block">NEEV-VISION</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {["Overview", "Students", "Assignments", "Reports", "Settings"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item === "Overview" && <Activity size={20} />}
              {item === "Students" && <Users size={20} />}
              {item === "Assignments" && <BookOpen size={20} />}
              {item === "Reports" && <FileText size={20} />}
              {item === "Settings" && <User size={20} />}
              <span className="hidden lg:block font-medium">{item}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-400"></div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">Sarah Wilson</p>
              <p className="text-xs text-slate-400">Class Teacher</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-20 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Class 10-A Monitor</h1>
              <p className="text-slate-500 text-sm">
                Welcome back. You have <span className="font-bold text-red-500">{alerts.length} alerts</span> needing attention.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
                />
              </div>
              <button
                onClick={handleGenerateReport}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 transform"
              >
                <Download size={18} />
                {pdfReady ? "Generate Report" : "Loading PDF..."}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700">
              <Filter size={16} className="text-slate-500" />
              <span className="font-semibold">Filters:</span>
            </div>

            {["All", "Critical", "Watch", "Top"].map((status) => (
              <button
                key={status}
                onClick={() => setRiskFilter(status)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  riskFilter === status
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium"
                    : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status}
              </button>
            ))}

            {(riskFilter !== "All" || searchTerm) && (
              <button
                onClick={() => {
                  setRiskFilter("All");
                  setSearchTerm("");
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium ml-auto"
              >
                Clear All
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard title="Total Students" value={stats.total} subtext="Full Strength" icon={Users} color="bg-blue-500" />
            <StatCard
              title="Low Attendance"
              value={stats.lowAttendance}
              subtext="< 75% Rate"
              icon={Clock}
              color="bg-amber-500"
              trend="down"
            />
            <StatCard
              title="At Risk"
              value={stats.critical}
              subtext="Performance Drop"
              icon={AlertTriangle}
              color="bg-red-500"
              trend="down"
            />
            <StatCard title="Pending HW" value={stats.pending} subtext="Submissions" icon={FileText} color="bg-purple-500" />
            <StatCard
              title="Avg Class Score"
              value="72%"
              subtext="vs 68% last mo"
              icon={Activity}
              color="bg-emerald-500"
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">
                    Student Monitoring List
                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                      {filteredStudents.length}
                    </span>
                  </h3>
                  <button className="text-sm text-indigo-600 font-medium hover:underline">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Student Name</th>
                        <th className="px-6 py-4">Attendance</th>
                        <th className="px-6 py-4">Avg Marks</th>
                        <th className="px-6 py-4">Pending</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                  {student.name.substring(0, 2)}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-800 text-sm">{student.name}</p>
                                  <p className="text-xs text-slate-500">{student.roll}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span
                                  className={`text-sm font-bold ${
                                    student.attendance < 75 ? "text-red-600" : "text-slate-700"
                                  }`}
                                >
                                  {student.attendance}%
                                </span>
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      student.attendance < 75 ? "bg-red-500" : "bg-emerald-500"
                                    }`}
                                    style={{ width: `${student.attendance}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-sm font-medium ${
                                  student.marks < 40 ? "text-red-600" : "text-slate-700"
                                }`}
                              >
                                {student.marks}%
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {student.pending > 0 ? (
                                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">
                                  {student.pending} Tasks
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs">All done</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <RiskBadge status={student.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded transition-all"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                            No students found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 transition-all">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={20} />
                  Critical Alerts ({alerts.length})
                </h3>
                {alerts.length > 0 ? (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-red-200 transition-colors relative group"
                      >
                        <button
                          onClick={() => handleDismissAlert(alert.id)}
                          className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        <div className="flex gap-3 items-start pr-4">
                          <div
                            className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                              alert.type === "critical"
                                ? "bg-red-500"
                                : alert.type === "warning"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm text-slate-700 leading-tight">{alert.message}</p>
                            <p className="text-xs text-slate-400 mt-1.5">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 text-sm bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <CheckCircle className="mx-auto mb-2 opacity-50" size={24} />
                    All caught up! No alerts.
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="text-indigo-500" size={20} /> Live Activity
                  </span>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </h3>
                <div className="relative border-l border-slate-200 ml-2 space-y-6 pl-5 py-1 max-h-[300px] overflow-hidden">
                  {activityLog.map((log) => (
                    <div key={log.id} className="relative">
                      <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-white border-2 border-indigo-200"></div>
                      <p className="text-sm text-slate-800">
                        <span className="font-semibold">{log.user}</span> {log.action}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{log.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        notes={notes}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
