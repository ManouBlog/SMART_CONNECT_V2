import { defineStore } from 'pinia'
import instance from "../../api/api";

export const useOffreStore = defineStore('offres', {
    state: () => ({
        offres: [],
        ListOffre:[],
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
          }
    },
  })