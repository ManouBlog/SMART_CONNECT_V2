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
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.message === "Unauthenticated."
//     ) {
//       localStorage.removeItem("token");
//       // optionnel : d'autres clés locales
//       localStorage.removeItem("user");
//     }
//      /*
//     |--------------------------------------------------------------------------
//     | 429 - Too Many Attempts
//     |--------------------------------------------------------------------------
//     */
//     if (
//       error.response?.status === 429 &&
//       error.response?.data?.message === "Too Many Attempts."
//     ) {
//       alert(
//         "Trop de tentatives détectées. Veuillez patienter quelques instants avant de réessayer."
//       );
//     }
//     return Promise.reject(error);
//   }
// );
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      /*
      |--------------------------------------------------------------------------
      | 400 - Bad Request
      |--------------------------------------------------------------------------
      */
      case 400:
        alert("La requête est invalide. Veuillez vérifier les informations saisies.");
        break;

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
      | 403 - Forbidden
      |--------------------------------------------------------------------------
      */
      case 403:
        alert("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 404 - Not Found
      |--------------------------------------------------------------------------
      */
      case 404:
        alert("La ressource demandée est introuvable.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 405 - Method Not Allowed
      |--------------------------------------------------------------------------
      */
      case 405:
        alert("Méthode non autorisée.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 409 - Conflict
      |--------------------------------------------------------------------------
      */
      case 409:
        alert("Cette opération est en conflit avec les données existantes.");
        break;

      /*
      |--------------------------------------------------------------------------
      | 422 - Validation Error
      |--------------------------------------------------------------------------
      */
      case 422:
        alert("Certaines informations sont invalides. Veuillez les corriger.");
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
      | 500 - Internal Server Error
      |--------------------------------------------------------------------------
      */
      case 500:
        alert("Une erreur interne est survenue. Veuillez réessayer plus tard.");
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
          alert("Une erreur inattendue est survenue.");
        }
        break;
    }

    return Promise.reject(error);
  }
);

export default instance;