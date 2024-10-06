import { defineStore } from 'pinia'
import instance from "../../api/api";

export const useOffreStore = defineStore('offres', {
    state: () => ({
        offres: [],
        ListOffre:[],
        offreCreatedByEntreprise:[],
        ListeForFilterInOffreCreatedByEntreprise:[]
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
                // const DATAResponse = response.data.data.map(item=>{
                //   return{
                //     id:item.id,
                //     offre:item.nom_offre,
                //     lieu:item.lieu,
                //     honoraire:item.salaire,
                //     fin:item.job_fin
                //   }
                // });
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
          }
    },
  })