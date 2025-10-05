import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const apiClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
