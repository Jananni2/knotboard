 // api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Example: attach token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // or from Redux/context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
