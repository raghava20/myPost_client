import axios from "axios";

const API = axios.create({
  baseURL: "https://mypost-server.onrender.com/api",
  withCredentials: true, // Needed for HttpOnly cookies
});

export default API;
