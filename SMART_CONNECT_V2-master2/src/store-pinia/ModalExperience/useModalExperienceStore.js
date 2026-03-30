import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
// import instance from "../../api/api";
export const useModalExperienceStore = defineStore('modalExperience', {
    state: () => ({
        showModalExperience:false,
    }),
    actions: {
       changeValueForshowModalExperience(){
        this.showModalExperience = !this.showModalExperience
       },
     

    },
  })