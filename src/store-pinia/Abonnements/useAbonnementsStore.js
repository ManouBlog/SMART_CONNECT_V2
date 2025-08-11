import { defineStore } from 'pinia'
import { useStore } from 'vuex';
import {useCinetpayStore} from '../useCinetpayStore';
import { useRegisterStore } from "../register/useRegisterStore";



const RegisterStore = useRegisterStore();

export const useAbonnementsStore =defineStore('abonnements',()=>{
     const cinetpayStore = useCinetpayStore()
    const store = useStore();

   const createAbonement = async (idAbonnement)=>{
      if(!store.state.token){
        RegisterStore.changeValueIsModal()
      }else{
        cinetpayStore.paymentCinetpay({idAbonnement:idAbonnement});
      }
    };
    return{
        createAbonement,
    }
})