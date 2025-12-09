import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Good Afternoon, Akshay Sharma!</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search students..."
          className="border rounded-lg px-3 py-1"
        />
        <div className="font-medium">Akshay Sharma (Teacher)</div>
      </div>
    </div>
  );
}