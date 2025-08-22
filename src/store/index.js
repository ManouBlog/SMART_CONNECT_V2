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
    listEntreprise:[],
    spinnerLoading:false,
    nbreBadgeEntreprise:0,
  },
  getters: {},
  mutations: {
    addExperiences(state, person) {
      axios
        .post(
          "http://127.0.0.1:8000/api/postNewExperience",
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
    LISTERCOMPANY(state,payload){
      state.listEntreprise = payload; 
    },
    TOOGLESPINNER(state,payload){
    state.spinnerLoading = payload;
    },
    HANDLEBADGE(state,payload){
      state.nbreBadgeEntreprise = payload; 
    },
    UPDATEBADGEENTREPRISE(state){
      state.nbreBadgeEntreprise--
    }
  },
  actions: {
    // updateBadgeEntreprise({commit,state}){
    // const element =  state.nbreBadgeEntreprise-1;
    // commit('HANDLEBADGE',element)
    // },
    get_users({ commit,state }) {
      commit('TOOGLESPINNER',true)
      axios
        .get("https://backend.smart-connect.online/api/list_entreprise", {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        })
        .then((res) => {
          console.log('get_users',res)
          if(res.data.status){
          commit('LISTERCOMPANY',res.data.data)
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
