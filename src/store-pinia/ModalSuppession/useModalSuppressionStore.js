import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
// import instance from "../../api/api";
export const useModalSuppressionStore = defineStore('modalSuppression', {
    state: () => ({
        showModalSuppression:false
    }),
    actions: {
       changeValueForShowModalSuppression(){
        this.showModalSuppression = !this.showModalSuppression
       },
     

    },
  })