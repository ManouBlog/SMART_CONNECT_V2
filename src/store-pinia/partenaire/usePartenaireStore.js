import { defineStore } from 'pinia'
import instance from "../../api/api";

export const usePartenaireStore = defineStore('partenaires', {
    state: () => ({
        partenaires: [],
        partnerChoose:[],
    }),
    actions: {
       async getAllPartenaires() {
            try{
           const response = await instance.get("allPartenaire");
        //    console.log("getAllPartenaires",response)
           if(response['status'] === 200){
            this.partenaires = response.data.data
           }
            }catch(error){
                console.log(error)
            }
          },
       showPartnerChosen(payload){
        this.partnerChoose = payload;
       }
    },
  })