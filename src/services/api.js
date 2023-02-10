import axios from "axios";
const api = axios.create({
  baseURL: "https://projetoweb2-backend-production.up.railway.app",
});

export default api;
