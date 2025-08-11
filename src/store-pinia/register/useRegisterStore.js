import { defineStore } from 'pinia'
import instance from "../../api/api";
import {useSwalPopup} from "../SwalPopup/useSwalPopup";


export const useRegisterStore = defineStore('register', {
    state: () => ({
      count: 0,
      competencesChoosen:[],
      allCompetences:[],
      isPolitics:false,
      isModal:false,
      SWALPOPUP: useSwalPopup()
    }),
    actions: {
       async getAllCompetences() {
            try{
           const response = await instance.get("GetAllCompetences");
           console.log("getAllCompetences",response)
           if(response['status'] === 200){
            this.allCompetences = response.data.data
           }
            }catch(error){
                console.log(error)
            }
          },
        addTag(payload) {
            console.log(payload);
            this.competencesChoosen = [];
            payload.forEach((el) => {
              this.competencesChoosen.push(el.id);
            });
          },
        changeValueIsPolitics(payload){
          this.isPolitics = payload
        },
        changeValueIsModal(){
          this.isModal = !this.isModal
        },
        async registerStudent(payload) {
          console.log("registerStudent",payload)
          let data = new FormData();
          payload.myCompetence.forEach((item) => {
            data.append("competence[]", item.id);
          });
          data.append("nom", payload.nom);
          data.append("prenoms", payload.prenoms);
          data.append("email", payload.email);
          data.append("commune", payload.commune);
          data.append("quartier", payload.quartier);
          data.append("phone", payload.phone);
          data.append("ville", payload.ville);
          data.append("diplome", payload.diplome);
          data.append("password", payload.password);
          data.append("statut_id", 2);
          data.append("photo", payload.photo);
         await instance
            .post("list_users", data)
            .then((response) => {
              console.log(response);
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            });
        },
    },
  })