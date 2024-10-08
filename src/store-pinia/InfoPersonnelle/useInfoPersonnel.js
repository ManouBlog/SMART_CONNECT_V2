import { defineStore } from 'pinia'
import Swal from "sweetalert2";
import instance from "../../api/api";
export const useInfoPersonnel = defineStore('infoPersonnelle', {
    state: () => ({
        toogleModalInfoPersonnelle:false,
        registre:null,
        pieceIdentiteGerant:null
    }),
    actions: {
       changeValueForToogleModalInfoPersonnelle(){
        console.log("this.toogleModalInfoPersonnelle",this.toogleModalInfoPersonnelle)
        this.toogleModalInfoPersonnelle = !this.toogleModalInfoPersonnelle
       },
      async update_compte_entreprise(payload) {
        console.log(payload.matricule_cc)
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
          });
      },
      addAnRegistreDoc(payload){
        console.log(payload.target.files[0])
       this.registre = payload.target.files[0]
      },
      addAnPieceDoc(payload){
        this.pieceIdentiteGerant = payload.target.files[0]
      }
    },
  })