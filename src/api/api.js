// import axios from "axios";
// export const lienPhoto = `${process.env.VUE_APP_LIENS_BACKEND}storage/app/public/images/`
// // export const LocalPhoto = `${process.env.VUE_APP_LIENS_BACKEND}storage/images/`
// export const lienPDF = `${process.env.VUE_APP_LIENS_BACKEND}storage/app/public/pdf/`
// const instance = axios.create({
//   baseURL: `${process.env.VUE_APP_LIENS_BACKEND}api`,
// }); 

// instance.interceptors.request.use((config) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;

import axios from "axios";

export const lienPhoto = `${process.env.VUE_APP_LIENS_BACKEND}storage/app/public/images/`;
// export const LocalPhoto = `${process.env.VUE_APP_LIENS_BACKEND}storage/images/`;
export const lienPDF = `${process.env.VUE_APP_LIENS_BACKEND}storage/app/public/pdf/`;

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_LIENS_BACKEND}api`,
});

// Ta logique de requête reste inchangée
instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⇒ Ajout : intercepteur de réponse pour le 401 Unauthenticated
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthenticated."
    ) {
      localStorage.removeItem("token");
      // optionnel : d'autres clés locales
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default instance;