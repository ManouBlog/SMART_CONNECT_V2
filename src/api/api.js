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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
     

      /*
      |--------------------------------------------------------------------------
      | 401 - Unauthorized
      |--------------------------------------------------------------------------
      */
      case 401:
        if (message === "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        alert("Votre session a expiré. Veuillez vous reconnecter.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 429 - Too Many Requests
      |--------------------------------------------------------------------------
      */
      case 429:
        alert("Trop de tentatives détectées. Veuillez patienter quelques instants avant de réessayer.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 502 - Bad Gateway
      |--------------------------------------------------------------------------
      */
      case 502:
        alert("Le serveur est momentanément indisponible.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 503 - Service Unavailable
      |--------------------------------------------------------------------------
      */
      case 503:
        alert("Le service est actuellement indisponible. Veuillez réessayer plus tard.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 504 - Gateway Timeout
      |--------------------------------------------------------------------------
      */
      case 504:
        alert("Le serveur met trop de temps à répondre. Veuillez réessayer.");
        break;

      default:
        if (!status) {
          alert("Impossible de joindre le serveur. Vérifiez votre connexion Internet.");
        } else {
          console.error("Une erreur inattendue est survenue.");
        }
        break;
    }

    return Promise.reject(error);
  }
);

export default instance;