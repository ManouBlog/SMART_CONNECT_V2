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
    nbreBdageEntreprisePasAbonnee:0,
    nbreBdageEntrepriseAbonnee:0,
    listStudentAbonne:[],
    listStudentPasAbonne:[],
    isDisplayMenuBar:false
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
    TOOGGLE_MENU(state,payload){
     state.isDisplayMenuBar = payload
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
    HANDLECOMPANYNOTSUSCRBIBE(state,payload){
      state.nbreBdageEntreprisePasAbonnee = payload;
    },
    DECREMENT_COMPANY_NOT_SUSCRIBE(state){
      state.nbreBdageEntreprisePasAbonnee--
    },
    DECREMENT_COMPANY_SUSCRIBE(state){
      state.nbreBdageEntrepriseAbonnee--
    },
    LISTER_STUDENT_ABONNE(state,payload){
      state.listStudentAbonne = payload
      console.log("LISTER_STUDENT_ABONNE",state.listStudentAbonne)
    },
     LISTER_STUDENT_NOT_ABONNE(state,payload){
      state.listStudentPasAbonne = payload
      console.log("LISTER_STUDENT_ABONNE",state.listStudentAbonne)
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
          commit('HANDLECOMPANYNOTSUSCRBIBE',res.data.data.filter(item=> !item.user?.abonement?.length && item.view == 1).length)
          commit('DECREMENT_COMPANY_SUSCRIBE',res.data.data.filter(item=> item.user?.abonement?.length > 0 && item.view == 1).length)
          } 
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          commit('TOOGLESPINNER',false)
        })
    },
    get_Students_abonne({ commit,state }) {
      commit('TOOGLESPINNER',true)
      axios
        .get("https://backend.monbrobroli.com/api/list_students", {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        })
        .then((res) => {  
          if(res.data.status){
             const arrayStudent = Object.entries(res.data.data)
             .map(([_key, value]) => value);
         console.log('get_Students_abonne',arrayStudent)
            // console.log("LISTER_COMPANY_ABONNEE",res.data.data.filter(item=> item.user?.abonement?.length > 0))
            // console.log('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          commit('LISTER_STUDENT_ABONNE',arrayStudent.filter(item=> item.view == 1).length)
          // commit('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          // commit('HANDLEBADGE',res.data.data.filter(item=>item.view == 1).length)
          // commit('HANDLECOMPANYNOTSUSCRBIBE',res.data.data.filter(item=> !item.user?.abonement?.length && item.view == 1).length)
          // commit('DECREMENT_COMPANY_SUSCRIBE',res.data.data.filter(item=> item.user?.abonement?.length > 0 && item.view == 1).length)
          } 
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          commit('TOOGLESPINNER',false)
        })
    },
    get_Students_Non_Abonne({ commit,state }) {
      commit('TOOGLESPINNER',true)
      axios
        .get("https://backend.monbrobroli.com/api/list_visiteurs", {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        })
        .then((res) => {  
          if(res.data.status){
             const arrayStudent = Object.entries(res.data.data)
             .map(([_key, value]) => value);
         console.log('get_Students_Non_Abonne',arrayStudent)
            // console.log("LISTER_COMPANY_ABONNEE",res.data.data.filter(item=> item.user?.abonement?.length > 0))
            // console.log('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          commit('LISTER_STUDENT_NOT_ABONNE',arrayStudent.filter(item=> item.view == 1).length)
          // commit('LISTER_COMPANY_NON_ABONNEE',res.data.data.filter(item=> !item.user?.abonement?.length))
          // commit('HANDLEBADGE',res.data.data.filter(item=>item.view == 1).length)
          // commit('HANDLECOMPANYNOTSUSCRBIBE',res.data.data.filter(item=> !item.user?.abonement?.length && item.view == 1).length)
          // commit('DECREMENT_COMPANY_SUSCRIBE',res.data.data.filter(item=> item.user?.abonement?.length > 0 && item.view == 1).length)
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
