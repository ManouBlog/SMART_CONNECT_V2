import { defineStore } from 'pinia'
import instance from "../../api/api";
import Swal from "sweetalert2";
import {useModalSuppressionStore} from "../ModalSuppession/useModalSuppressionStore"
const Modal = useModalSuppressionStore();
export const useOffreStore = defineStore('offres', {
    state: () => ({
        offres: [],
        ListOffre:[],
        offreCreatedByEntreprise:[],
        ListeForFilterInOffreCreatedByEntreprise:[],
        idItemDelete:null
    }),
    actions: {
       async getOffres() {
            try{
           const response = await instance.get("list_offres");
           console.log("list_offres",response)
           if(response['status'] === 200){
            this.offres = response.data.data
            let offresWithDateExpirationSupAtToday = [];
            this.offres.find((item) => {
                if (new Date(item.fin) >= new Date()) {
                  offresWithDateExpirationSupAtToday.push(item);
                } else {
                  offresWithDateExpirationSupAtToday = this.offres.slice(0, 4);
                }
              });
              this.ListOffre = offresWithDateExpirationSupAtToday.slice(0, 4);
           }
            }catch(error){
                console.log(error)
            }
          },
          async getAllOffresCreatedByEntreprise(){
            try{
              const response = await instance.get("get_offres_entreprise");
              if(response['status'] === 200){
                console.log("response.data.data1",response.data.data)
                this.ListeForFilterInOffreCreatedByEntreprise = response.data.data
                this.offreCreatedByEntreprise = response.data.data
              }
                
            }catch(error){
              console.log(error)
            }
          },
          filterInArrayOffreCreatedByEntreprise(payload){
            console.log("payload",payload)
            this.ListeForFilterInOffreCreatedByEntreprise.filter(item=>item.offre.toLowerCase().includes(payload))
              this.offreCreatedByEntreprise = this.ListeForFilterInOffreCreatedByEntreprise
              console.log("this.offreCreatedByEntreprise",this.offreCreatedByEntreprise)
          },
          handleIdItemDelete(payload){
            this.idItemDelete = payload
          },
          handleDeleteOffre() {
            console.log("idItemDelete",this.idItemDelete)
            instance
              .delete("delete_offre_entreprise/" + this.idItemDelete)
      
              .then((res) => {
                console.log(res);
      
                if (res.data.status === true) {
                  Modal.changeValueForShowModalSuppression()
                  Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  const index = this.offreCreatedByEntreprise.findIndex(
                    (objet) => objet.id === this.idItemDelete
                  );
                  this.offreCreatedByEntreprise.splice(index, 1);
                }
              })
              .catch((err) => {
                if (err) {
                  Swal.fire({
                    icon: "error",
                    title: err,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          },
    },
  })