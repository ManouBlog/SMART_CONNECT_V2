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
    contratStudent:'',
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
    SET_INFO_USER(state,payload){
    state.user = payload
    },
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
        if(res.data.status === true){
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
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
     },
     ADD_USER_WISH_LIST(state,payload){
      console.log('ADD_USER_WISH_LIST',payload)
     if (!state.whistListPerson) state.whistListPerson = [];
      state.whistListPerson.push(payload);
     },
     RETIRE_USER_WISH_LIST(state, payload) {
  const IDPerson = payload;
  // console.log("IDPerson",IDPerson)
  const index = state.whistListPerson.findIndex(
    (id) => id === IDPerson
  );
  // console.log("index233",index)
  if (index !== -1) {
    state.whistListPerson.splice(index, 1);
  }
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
            const element =  response.data?.entreprises?.filter(item=>item?.pivot?.alarm === 1).length
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
     },
     DELETE_STATE_USER(state){
      state.user = null
      state.token = null
     }
  },
  actions: {   
  async addListFavoris({ commit, state }, payload) {
    // console.log("addListFavoris",payload)
  try {
    const response = await instance.post(
      "saveWishlist",
      { user_id: payload.id },
      {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      }
    );

    // Ne modifie pas la logique métier
    if (response.data.status === true) {
      commit("ADD_USER_WISH_LIST", payload.id);
    }
    
    if (response.data.status === false) {
        commit("RETIRE_USER_WISH_LIST", payload.id);
    }

    // console.log("state.whistListPerson",state.whistListPerson)

    // return response.data;
  } catch (error) {
    console.error("addListFavoris error:", error);
    // Garde ton format de retour exact
    return error?.response?.data?.exception || error;
  }
},
   async handleListeFavoris({commit,state}) {
    if (state.token) {
      await instance
        .get("getAllWishlist")
        .then((response) => {
          // console.log("GET_ALL_WISH_LISTd", response?.data?.data.map(item=>item.wishlisted_user.id));
          commit('GET_ALL_WISH_LIST',response?.data?.data.map(item=>item.wishlisted_user.id))
        })
        .catch((error) => {
          console.log(error);
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
            // console.log("getInfoUser_store",resp.data.user)
            commit("UPDATE_INFO_CONPANY",resp.data.user)
            commit("SET_INFO_USER",resp.data.user)
          }
        })
        .catch((error) => {
          console.log(error);
           commit("UPDATE_INFO_CONPANY",null)
            commit("SET_INFO_USER",null)
        });
    },
    deleteStateUser({commit}){
      commit("DELETE_STATE_USER")
    }
  },
  modules: {
  }
})
