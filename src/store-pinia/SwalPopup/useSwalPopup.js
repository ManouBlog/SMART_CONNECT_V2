import { defineStore } from 'pinia'
import Swal from "sweetalert2";

export const useSwalPopup = defineStore('swalPopup',()=>{

     const declencheSwalPopup = (statut,message)=>{
        Swal.fire({
            icon: statut,
            title: message,
            showConfirmButton: true,
          });
     }

    return{
        declencheSwalPopup
    }
})