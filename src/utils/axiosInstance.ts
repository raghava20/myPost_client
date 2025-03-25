import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Needed for HttpOnly cookies
});

export default API;
