import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:3001/v1", // Replace with your API URL
  timeout: 10000, // Request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional)
API.interceptors.request.use(
  (config) => {
    // Modify request before sending (e.g., add auth token)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default API;
