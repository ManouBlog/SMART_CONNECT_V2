import { defineStore } from 'pinia'
import instance from "../../api/api";

export const useEntreprisesStore = defineStore('entreprise', {
    state: () => ({
        entreprises: [],
        timetable:[],
    }),
    actions: {
       async getEntreprise() {
            try{
           const response = await instance.get("AllEntrepriseWithTimetables");
           console.log("AllEntrepriseWithTimetables",response)
           if(response['status'] === 200){
            this.entreprises = response.data.data
            this.timetable = response.data.timetable;
           }
            }catch(error){
                console.log(error)
            }
          }
    },
  })