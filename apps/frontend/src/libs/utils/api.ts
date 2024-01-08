import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3042",
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});
