import axios from "axios";
export const lienPhoto = `${process.env.VUE_APP_LIENS_LOCAL}storage/images/`
export const lienPDF = `${process.env.VUE_APP_LIENS_LOCAL}storage/pdf/`
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_LIENS_LOCAL}api`,
  //  baseURL: "http://backend.smart-connect.online/api", // ton backend
  // withCredentials: true, // ⚡️ important pour Sanctum & cookies cross-domain
  // headers: {
  //   "Accept": "application/json",
  //   "Content-Type": "application/json",
  // },
}); 

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;