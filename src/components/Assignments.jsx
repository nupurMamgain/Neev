export default function Assignments() {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-5">
      <h3 className="text-lg font-semibold mb-3">Assignments & Homework</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Trigonometry Problem Set</p>
            <p className="text-gray-500 text-sm">Due in 2 days</p>
          </div>
          <p>32/38 Submitted</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Algebra II Test</p>
            <p className="text-gray-500 text-sm">Due: Yesterday</p>
          </div>
          <p>15/38 Graded</p>
        </div>

        <div>
          <p className="font-semibold">Geometry Proofs</p>
          <p className="text-gray-500 text-sm">Due: 20th Sep</p>
        </div>
      </div>
    </div>
  );
}