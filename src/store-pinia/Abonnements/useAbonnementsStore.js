import { defineStore } from 'pinia'
// import { useRouter} from 'vue-router';
// import Swal from "sweetalert2";
import { useStore } from 'vuex';
import {useCinetpayStore} from '../useCinetpayStore'
import {useSwalPopup} from "../SwalPopup/useSwalPopup"
import {useLoadingSpinner} from "../LoadingSpinner/useLoadingSpinner"
import { useRegisterStore } from "../register/useRegisterStore";
import instance from "../../api/api";


const RegisterStore = useRegisterStore();

export const useAbonnementsStore =defineStore('abonnements',()=>{
     const cinetpayStore = useCinetpayStore()
     const loadingSpinner = useLoadingSpinner()
     const SWALPOPUP = useSwalPopup(); 
    const store = useStore();

   const createAbonement = async (idAbonnement,priceAbonnement)=>{
      if(!store.state.token){
        RegisterStore.changeValueIsModal()
      }else{
        loadingSpinner.launchLoading(true)
        const TRANSACTION_ID = Math.floor(Math.random() * 9000000000) + 1000000000;
         try {
          const response = await instance.post("payStack/paiement", {
          abonement_id: idAbonnement,
          channels: "undefined",
          transaction_id:TRANSACTION_ID
        });
        console.log("RESPONSEABONNEMENT",response)
        if(response.data.status){
          localStorage.setItem("@ID",JSON.stringify(TRANSACTION_ID))
       cinetpayStore.paymentCinetpay({idAbonnement:idAbonnement,priceAbonnement:priceAbonnement});
        }else{
           SWALPOPUP.declencheSwalPopup("info",response.data.message)
        }
     
         loadingSpinner.launchLoading(false)
      } catch (error) {
        console.log(error);
        SWALPOPUP.declencheSwalPopup("info",error.response.data.message)
        loadingSpinner.launchLoading(false)
      }
      }
      
    };

    return{
        createAbonement,
    }
})