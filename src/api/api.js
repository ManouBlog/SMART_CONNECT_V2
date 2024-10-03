import axios from "axios";
export const lienPhoto ="http://127.0.0.1:8000/storage/images/"
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
}); 

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;