export default function StudentCard({ initials, name, percent, color }) {
  return (
    <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow w-28">
      <div
        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold border-${color}-500 text-${color}-600`}
      >
        {initials}
      </div>
      <p className="mt-2 text-sm font-semibold">{name}</p>
      <p className="text-gray-500 text-xs">{percent}%</p>
    </div>
  );
}