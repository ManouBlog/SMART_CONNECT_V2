import { createStore } from 'vuex'
import Swal from "sweetalert2";
import instance from "../api/api";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || '',
    token: JSON.parse(localStorage.getItem("token")) || '',
    charte:false,
    whistListPerson:[],
    tabsActive:1,
    colorHeart:false,
    colorForlikePerson:false,
    compteUser:false,
    translate:"FR",
    contratStudent:JSON.parse(localStorage.getItem("alarm")) || '',
    abonnement:false,
    infoUserConnected:"",
     datesOfCalendar:[],
        handleHoraire:"Horaire",
        dateTime_debut:null,
        dateTime_fin:null,
        First_heure_start_from:null,
        First_heure_end_to:null,
        Second_heure_start_from:null,
        Second_heure_end_to:null
  },
  mutations: {
    SET_TABS_CONNEXION(state,payloadNumber){
     state.tabsActive = payloadNumber;
    },
    SET_DATES(state, dates) {
      state.datesOfCalendar = dates;
    },

    SET_HANDLE_HORAIRE(state, value) {
      state.handleHoraire = value;
    },

    SET_DATE_DEBUT(state, value) {
      state.dateTime_debut = value;
    },

    SET_DATE_FIN(state, value) {
      state.dateTime_fin = value;
    },

    SET_FIRST_HEURE_START(state, value) {
      state.First_heure_start_from = value;
    },

    SET_FIRST_HEURE_END(state, value) {
      state.First_heure_end_to = value;
    },

    SET_SECOND_HEURE_START(state, value) {
      state.Second_heure_start_from = value;
    },

    SET_SECOND_HEURE_END(state, value) {
      state.Second_heure_end_to = value;
    },
     deletePersonAtWishList(state,idPerson){
      instance.delete("deletePersonInMyWishlist/"+idPerson)
      .then((res) => {
        // console.log(res);
        if(res.data.status === true){
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(()=>{
            location.reload(true);
          },1500)
        }
      })
      .catch((error) => {
        console.log(error);
      })
     },
     UPDATE_INFO_CONPANY(state,payload){
      state.infoUserConnected = payload
     },
     GET_ALL_WISH_LIST(state,payload){
      state.whistListPerson = payload
      // console.log("GET_ALL_WISH_LIST",state.whistListPerson)
     },
     CHANGE_LANGAGE_WEB(state,langue){
      state.translate = langue;
     },
     ADD_ITEM(state){
      if(state.token){
        instance
        .get("get_who_contact_student",{
          headers: {
            Authorization: "Bearer " + state.token,
          },
        })
        .then((response) => {
          // console.log("get_who_contact_student",response.data.entreprises.filter(item=>item.pivot.alarm === 1).length);
            const element =  response.data.entreprises.filter(item=>item.pivot.alarm === 1).length
            state.contratStudent = element;
            localStorage.setItem("alarm", element);
        })
        .catch((error) => {
          console.log(error);
        })
      }else{
        return;
      }
      
     },
     DECREASE_ALARM(state){
      state.contratStudent--;
      localStorage.setItem("alarm", state.contratStudent);
     },
     CLOSE_ABONNEMENT(state){
      state.abonnement = true;
     }
  },
  actions: {   
   async addListFavoris({commit,state},payload){
    // console.log("addListFavoris",payload)
      await instance.post("saveWishlist",{
        student_id: payload.id,
      }, {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((response) => {
        if(response.data.status === true){
          // state.colorHeart = true;
          state.whistListPerson.push(payload)
          commit("GET_ALL_WISH_LIST",state.whistListPerson)
        }
        if(response.data.status === false){
          // state.colorHeart = false;
          const Deleteperson = state.whistListPerson.findIndex(p=>p.id === payload.id)
          state.whistListPerson.splice(Deleteperson,1)
          commit("GET_ALL_WISH_LIST",state.whistListPerson)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    
   },
   async handleListeFavoris({commit,state}) {
    if (state.token) {
      await instance
        .get("getAllWishlist")
        .then((response) => {
          // console.log("WISHLIST", response.data.data);
          commit('GET_ALL_WISH_LIST',response?.data?.data?.wishlists)
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      return;
    }
  },
   async getInfoUser({commit}) {
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          if (resp.data.status === true) {
            commit("UPDATE_INFO_CONPANY",resp.data.user)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {
  }
})
