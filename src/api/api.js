import axios from "axios";
export const lienPhoto = `${process.env.VUE_APP_LIENS_BACKEND}storage/app/public/images/`
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_LIENS_BACKEND}api`,
}); 

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;