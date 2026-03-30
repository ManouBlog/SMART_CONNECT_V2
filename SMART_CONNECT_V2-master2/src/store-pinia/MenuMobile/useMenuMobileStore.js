import { defineStore } from 'pinia'
// import Swal from "sweetalert2";
// import instance from "../../api/api";
export const useMenuMobile = defineStore('menuMobile', {
    state: () => ({
        showMenuMobile:false,
    }),
    actions: {
       changeValueForshowMenuMobile(){
        this.showMenuMobile = !this.showMenuMobile
       },
     

    },
  })