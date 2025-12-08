// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://10.133.7.29:8000", // 👈 tumhara BASE URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
