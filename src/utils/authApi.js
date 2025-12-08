// src/util/authApi.js
import axiosClient from "./axiosClient";

// Common error extractor
const extractError = (error, fallback = "Something went wrong") => {
  return (
    error.response?.data?.message ||
    error.response?.data?.detail ||
    error.response?.data?.error ||
    fallback
  );
};

// 🔹 STUDENT SIGNUP (class_obj removed)
export const signupStudent = async ({name, email, password,class_obj}) => {
  try {
    const res = await axiosClient.post("/api/student-registration/", {
      name,
      email,
      password,
      class_obj


    });
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Student signup failed"));
  }
};

// 🔹 TEACHER SIGNUP
export const signupTeacher = async ({ name, email, password, subjects }) => {
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

// 🔹 LOGIN (working for student + teacher)
export const loginUser = async ({ name,email, password }) => {
  try {
    const res = await axiosClient.post("/api/login/", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Login failed"));
  }
};

// 🔹 GET SUBJECTS for teacher registration
export const getSubjects = async () => {
  try {
    const res = await axiosClient.get("/api/subjects/");
    return res.data.data || res.data; // supports both formats
  } catch (error) {
    throw new Error(extractError(error, "Failed to fetch subjects"));
  }
};
