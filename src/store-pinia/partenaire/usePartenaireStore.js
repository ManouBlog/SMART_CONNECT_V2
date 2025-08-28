import { defineStore } from 'pinia'
import instance from "../../api/api";
// import {Help} from "../../utils"
// import { useLoadingSpinner } from "../LoadingSpinner/useLoadingSpinner";
// const loadingSpinner = useLoadingSpinner()
export const usePartenaireStore = defineStore('partenaires', {
    state: () => ({
        partenaires: [],
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
         
    },
  })