import axios from "axios";

// Central axios instance. Base URL points at the deployed Express API.
const api = axios.create({
  baseURL: "https://civicconnect-backend-ogtt.onrender.com/api",
});

// Attach the JWT (if present) to every outgoing request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;