import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/learning-portal",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
