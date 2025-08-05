import { defineStore } from 'pinia'
// import { useRouter} from 'vue-router';
import { useStore } from 'vuex';
import {useCinetpayStore} from '../useCinetpayStore'
import {useSwalPopup} from "../SwalPopup/useSwalPopup"
import {useLoadingSpinner} from "../LoadingSpinner/useLoadingSpinner"
import { useRegisterStore } from "../register/useRegisterStore";
// import instance from "../../api/api";


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
         try {
         cinetpayStore.paymentCinetpay({idAbonnement:idAbonnement,priceAbonnement:priceAbonnement});
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