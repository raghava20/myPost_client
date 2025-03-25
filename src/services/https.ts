import axios from "axios";
// import { getToken } from "@/utils";

const baseUrl = "http://localhost:5001/api/v1";

const createAuthAxiosInstance = (isTokenNeeded = true) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use((config) => {
    if (isTokenNeeded) {
      const token = "none";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      config.headers.Authorization = "Bearer authenticate-user";
    }
    return config;
  });

  return instance;
};

export { baseUrl, createAuthAxiosInstance };
