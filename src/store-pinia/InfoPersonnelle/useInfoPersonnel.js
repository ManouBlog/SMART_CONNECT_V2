import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import instance from "../../api/api";
import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
const Spinner = useLoadingSpinner()
export const useInfoPersonnel = defineStore('infoPersonnelle', {
    state: () => ({
        toogleModalInfoPersonnelle:false,
        registre:null,
        pieceIdentiteGerant:null,
        logoEntreprise:""
    }),
    actions: {
       changeValueForToogleModalInfoPersonnelle(){
        console.log("this.toogleModalInfoPersonnelle",this.toogleModalInfoPersonnelle)
        this.toogleModalInfoPersonnelle = !this.toogleModalInfoPersonnelle
       },
       async getInfoUser(){
      await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            console.log("voirInfoUserConnect",resp);
            if (resp.data.status === true) {
             this.user = resp.data.user
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
      async update_compte_entreprise(payload) {
        console.log("update_compte_entreprise",payload)
        Spinner.launchLoading(true)
        let data = new FormData();
        data.append("nom", payload.nom);
        data.append("email", payload.email);
        data.append("gerant", payload.gerant);
        data.append("numero_gerant", payload.numero_gerant);
        data.append("piece_gerant", this.pieceIdentiteGerant);
        data.append("commune", payload.commune);
        data.append("forme_juridique", payload.forme_juridique);
        data.append("quartier", payload.quartier);
        data.append("contact", payload.contact);
        data.append("ville", payload.ville);
        data.append("logo",this.logoEntreprise);
        data.append("matricule_cc", payload.matricule_cc);
        data.append("statut_id", 1);
        data.append("registre", this.registre);
  
       await instance
          .post("modifier_profil", data)
          .then((res) => {
            console.log(res);
            if (res.data.status === true) {
              Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              return res.data.status;
            }
            if (res.data.status === false) {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
  
          .catch((err) => {
            console.log(err);
          })
          .finally(()=>{
            Spinner.launchLoading(false)
          })
      },
      addAnRegistreDoc(payload){
        console.log(payload.target.files[0])
       this.registre = payload.target.files[0]
      },
      addAnPieceDoc(payload){
        this.pieceIdentiteGerant = payload.target.files[0]
      },
      addAnLogo(payload){
        this.logoEntreprise = payload.target.files[0]
      },
      verifIfPasswordIsExact(payload){
        console.log(payload)
        if (payload.confirmation_password !== payload.password) {
          Swal.fire({
            icon: "info",
            title: "la confirmation du mot de passe et le nouveau mot de passe ne correspond pas",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          this.routeForLaunchModifyPassword({
            oldPassword: payload.oldPassword,
            password: payload.password,
          })
        }
      },
      async routeForLaunchModifyPassword(data) {
        console.log(data)
        try{
        const response = await instance.post("passwordModify",data)
        console.log("routeForLaunchModifyPassword",response)
        if(response["status"] === 200){
          Swal.fire({
            icon: "success",
            title: "Mot de passe changé",
            showConfirmButton: false,
            timer: 1500,
          });
        }else{
          Swal.fire({
            icon: "info",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        }catch(error){
          console.log(error)
        }

      }

    },
  })