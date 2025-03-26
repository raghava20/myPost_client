import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://mypost-server.onrender.com/api",
  withCredentials: true, // Needed for HttpOnly cookies
});

// Attach Authorization token (if stored in cookies)
API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
