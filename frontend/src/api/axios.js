import axios from "axios";

// Central axios instance. Base URL points at the Express API.
// If you deploy the backend elsewhere, change this one line.
const api = axios.create({
  baseURL: "http://localhost:5000/api"
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
