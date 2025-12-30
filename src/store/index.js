/* eslint-disable */
import { createStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    categoriesStatistiquesChoosen: null,
    periodeStatistiquesChoosen: null,
    listEntrepriseAbonnee:[],
    listEntreprisePasAbonnee:[],
    spinnerLoading:false,
    nbreBadgeEntreprise:0,
  },
  getters: {},
  mutations: {
    addExperiences(state, person) {
      axios
        .post(
          "https://backend.monbrobroli.com/api/postNewExperience",
          {
            experience: person.experience,
            lieu: person.lieu,
            dateDebut: person.dateDebut,
            dateFin: person.dateFin,
            poste: person.poste,
            entreprise: person.entreprise,
          },
          {
            headers: {
              Authorization: "Bearer " + state.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "info",
            title: "Il y'a un souci avec le réseau.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        });
    },
    FIRSTCATEGORIE(state, payload) {
      state.categoriesStatistiquesChoosen = payload;
    },
    FIRSTPERIODE(state, payload) {
      state.periodeStatistiquesChoosen = payload;
    },
    LISTER_COMPANY_ABONNEE(state,payload){
      state.listEntrepriseAbonnee = payload; 
    },
    LISTER_COMPANY_NON_ABONNEE(state,payload){
      state.listEntreprisePasAbonnee = payload; 
    },
    TOOGLESPINNER(state,payload){
    state.spinnerLoading = payload;
    },
    HANDLEBADGE(state,payload){
      state.nbreBadgeEntreprise = payload; 
    },
    HANDLE_BADGE_ON_ACTION(state, entrepriseId) {
  // Cherche dans les deux listes
  const allCompanies = [
    ...state.listEntrepriseAbonnee,
    ...state.listEntreprisePasAbonnee
  ];

  const company = allCompanies.find(
    item => item.id === entrepriseId && item.view === 1
  );

  if (company) {
    company.view = 0;

    if (state.nbreBadgeEntreprise > 0) {
      state.nbreBadgeEntreprise--;
    }
  }
}
  },
  actions: {
    get_users({ commit,state }) {
      commit('TOOGLESPINNER',true)
      axios
        .get("https://backend.monbrobroli.com/api/list_entreprise", {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        })
        .then((res) => {
          console.log('get_users',res)
          if(res.data.status){
            console.log("LISTER_COMPANY_ABONNEE",res.data.data.filter(item=> item.user?.abonement?.length > 0))
            console.log('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          commit('LISTER_COMPANY_ABONNEE',res.data.data.filter(item=> item.user?.abonement?.length > 0))
          commit('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          commit('HANDLEBADGE',res.data.data.filter(item=>item.view == 1).length)
          } 
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          commit('TOOGLESPINNER',false)
        })
    },
    addFirstItemForCategorieStatistique(context) {
      context.commit("FIRSTCATEGORIE");
    },
    addFirstItemForPeriodeStatistique(context) {
      context.commit("FIRSTPERIODE");
    },
    
  },
  modules: {},
});
