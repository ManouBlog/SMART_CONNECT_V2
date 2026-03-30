import axios from "axios";

export const lien = "http://192.168.1.13:8000/storage/"

const apiconfig = axios.create({
  baseURL: "https://support-it-backend.lce-ci.com/api/",
});

apiconfig.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});


// Interceptor pour ajouter le token automatiquement
apiconfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // récupère le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ajoute l'entête
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiconfig;
