import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("STEPZO_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
