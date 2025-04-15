import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://alaiy-assignment.onrender.com/api",
  withCredentials: true,
});
