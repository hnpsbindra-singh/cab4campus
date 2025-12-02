import axios from "axios";

const api = axios.create({
  baseURL: "https://cab4campus-eight.vercel.app/",
});

export default api;

