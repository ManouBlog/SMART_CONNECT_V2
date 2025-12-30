import axios from "axios";
export const lienPhoto = `${process.env.VUE_APP_LIENS_LOCAL}storage/app/public/images/`
export const lienPDF = `${process.env.VUE_APP_LIENS_LOCAL}storage/app/public/pdf/`
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_LIENS_LOCAL}api`,
}); 

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;