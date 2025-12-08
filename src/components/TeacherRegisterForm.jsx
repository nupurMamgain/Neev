import React, { useEffect, useState } from "react";

const TeacherRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subjects: [],
  });

  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadSubjects = async () => {
      try {
      {/*  const data = await getSubjects();*/}
        setAllSubjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleSubjectSelect = (id) => {
    setFormData((prev) => {
      const already = prev.subjects.includes(id);
      return {
        ...prev,
        subjects: already
          ? prev.subjects.filter((sub) => sub !== id)
          : [...prev.subjects, id],
      };
    });
  };
  const signupTeacher = async ({ name, email, password, subjects }) => {
  try {
    const res = await axiosClient.post("/api/teacher-registration/", {
      name,
      email,
      password,
      subjects, // Array: [1,2,...]
    });
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Teacher signup failed"));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await signupTeacher(formData);
      console.log("Teacher registered:", res);
      setMsg("Teacher registered successfully!");
    } catch (err) {
      console.error(err);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Teacher Registration
      </h2>

      {msg && (
        <p className="text-center text-sm p-2 rounded bg-blue-50 text-blue-700">
          {msg}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded-lg"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select Subjects</label>
        <div className="space-y-2">
          {allSubjects.map((sub) => (
            <label key={sub.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.subjects.includes(sub.id)}
                onChange={() => handleSubjectSelect(sub.id)}
              />
              <span>{sub.name} (Class {sub.class_obj})</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Registering..." : "Register as Teacher"}
      </button>
    </form>
  );
};

export default TeacherRegisterForm;
