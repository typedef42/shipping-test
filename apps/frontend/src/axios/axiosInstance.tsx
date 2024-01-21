// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3042/",
});

export default axiosInstance;
