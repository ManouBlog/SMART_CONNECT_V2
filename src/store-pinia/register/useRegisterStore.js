import { defineStore } from 'pinia'
import instance from "../../api/api";
import {useSwalPopup} from "../SwalPopup/useSwalPopup";
import {useLoadingSpinner} from '../LoadingSpinner/useLoadingSpinner'
// import Swal from 'sweetalert2';
export const useRegisterStore = defineStore('register', {
    state: () => ({
      count: 0,
      competencesChoosen:[],
      allCompetences:[],
      isPolitics:false,
      isModal:false,
      SWALPOPUP: useSwalPopup(),
      LOADINGSPINNER:useLoadingSpinner(),
      isLoading:false,
      infoUser:"",
      payload:"",
    }),
    actions: {
       async getAllCompetences() {
            try{
           const response = await instance.get("GetAllCompetences");
          //  console.log("getAllCompetences",response)
           if(response['status'] === 200){
            this.allCompetences = response.data.data
           }
            }catch(error){
                console.log(error)
            }
          },
        addTag(payload) {
            // console.log(payload);
            this.competencesChoosen = [];
            payload.forEach((el) => {
              this.competencesChoosen.push(el.id);
            });
          },
        changeValueIsPolitics(payload){
          this.isPolitics = payload.value
          this.infoUser = payload.infoUser
          this.payload = payload.payload
        },
        changeValueIsModal(){
          this.isModal = !this.isModal
        },
        async registerStudent(payload) {
          console.log("registerStudent25",payload)
          this.LOADINGSPINNER.launchLoading(true)
          this.isLoading = true;
          let data = new FormData();
       
          payload.myCompetence.forEach((item) => {
            data.append("competence[]", item.id);
          });
          payload.photo.forEach((item) => {
            data.append("photo[]", item);
          });
           payload.jour.forEach((item) => {
            data.append("jour[]", item);
          });
          data.append("nom", payload.nom);
          //  data.append("jour", payload.datesOfCalendar);
           data.append("First_horaire", payload.First_horaire);
           data.append("Second_horaire", payload.Second_horaire);
           data.append("totalHour", payload.totalHour);
           data.append("hour_periode_debut", payload.hour_periode_debut);
           data.append("hour_periode_fin", payload.hour_periode_fin);
            data.append("periode_debut", payload.periode_debut);
             data.append("periode_fin", payload.periode_fin);
             data.append("periode", payload.periode);
          data.append("prenoms", payload.prenoms);
          data.append("email", payload.email);
          data.append("commune", payload.commune);
          data.append("quartier", payload.quartier);
          data.append("phone",`${payload.countryCode}${payload.phone}`);
          data.append("ville", payload.ville);
          data.append("diplome", payload.diplome);
          data.append("password", payload.password);
          data.append("statut_id", 2);
          data.append("photo_profil", payload.photo_profil);
          data.append("bio", payload.bio);
          data.append("titreCv", payload.titreCv);
          // data.append("appareil", "iphone x");
          // data.append("token_push", "xhdf58ehhf85shdhe8554shedhe545shdh");
         await instance
            .post("list_users", data)
            .then((response) => {
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            }).finally(()=>{
              this.isLoading = false;
               this.LOADINGSPINNER.launchLoading(false)
            })
        },
  
        async registerCompany(payload) {
          console.log("registerCompany",payload)
          this.isLoading = true;
          this.LOADINGSPINNER.launchLoading(true);
          let data = new FormData();
          payload.photo.forEach((item) => {
            data.append("piece_gerant[]", item);
          });
          payload.email_cc.forEach((item) => {
            data.append("email_cc[]", item);
          });
          // data.append("email_cc", payload.email_cc);
          data.append("registre", payload?.Registre[0]?.originFileObj);
          data.append("nom", payload?.nom);
          // data.append("phone", payload?.contact);
          data.append("phone",`${payload.countryCode}${payload.contact}`);
          data.append("ville", payload?.ville);
          data.append("quartier", payload?.quartier);
          data.append("forme_juridique", payload?.juridique);
          data.append("email", payload?.email);
          data.append("commune", payload?.commune);
          data.append("gerant", payload?.gerant);
          // data.append("numero_gerant", payload?.Phonegerant);
          data.append("numero_gerant",`${payload.countryCodePhoneGerant}${payload?.Phonegerant}`);
          data.append("matricule_cc", payload?.matricule_cc);
          data.append("password", payload?.password);
          data.append("statut_id", 1);
          data.append("NCC", payload?.ncc);
          
          data.append("logo", payload?.Logo[0]?.originFileObj);
         await instance
            .post("list_users", data)
            .then((response) => {
              // console.log(response);
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
                  
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
        //          this.connexionUser({
        // email: payload.email,
        // password: payload.password,
        //    })
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
                
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            })
            .finally(()=>{
               this.isLoading = false;
               this.LOADINGSPINNER.launchLoading(false);
            })
        },
        async registerParticulier(payload) {
          // console.log("registerParticulier",payload)
          this.isLoading = true;
          this.LOADINGSPINNER.launchLoading(true);
          let data = new FormData();
          payload.photo.forEach((item) => {
            data.append("piece_gerant[]", item);
          });
          data.append("nom", payload?.nom);
          data.append("particulier_prenoms", payload?.prenoms);
          // data.append("phone", payload?.contact);
          
          data.append("phone",`${payload.countryCode}${payload.contact}`);
          data.append("ville", payload?.ville);
          data.append("quartier", payload?.quartier);
          data.append("email", payload?.email);
          data.append("commune", payload?.commune);
          data.append("password", payload?.password);
          data.append("statut_id", 4);
          // data.append("piece_gerant", payload?.piece_gerant[0]?.originFileObj);
         await instance
            .post("list_users", data)
            .then((response) => {
              // console.log(response);
              if (response.data.status === true) {
                this.SWALPOPUP.declencheSwalPopup("success",response.data.message)
                this.changeValueIsPolitics({value:false,infoUser:"",payload:""})
                this.changeValueIsModal()
        //          this.connexionUser({
        // email: payload.email,
        // password: payload.password,
        //    })
              }
              if (response.data.status === false) {
                this.SWALPOPUP.declencheSwalPopup("error",response.data.message)
                
              }
            })
            .catch((error) => {
              console.log(error);
              this.SWALPOPUP.declencheSwalPopup("info",error.response.data.message)              
            })
            .finally(()=>{
               this.isLoading = false;
               this.LOADINGSPINNER.launchLoading(false);
            })
        },
    },
  })