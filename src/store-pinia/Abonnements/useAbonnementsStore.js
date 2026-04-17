import { defineStore } from 'pinia'
import { useStore } from 'vuex';
import {ref} from 'vue';
import {useCinetpayStore} from '../useCinetpayStore';
import { useRegisterStore } from "../register/useRegisterStore";

const RegisterStore = useRegisterStore();

export const useAbonnementsStore =defineStore('abonnements',()=>{
     const cinetpayStore = useCinetpayStore()
    const store = useStore();

   const isChangeProfil = ref(false);
   const statutOfBase = ref(null);

   const handleChangeProfil = (payload)=>{
    isChangeProfil.value = payload
   }
   const handleMyStatutOfBase = (payload)=>{
    statutOfBase.value = payload;
   }
   const createAbonement = async (payload)=>{
      if(!store.state.token){
        RegisterStore.changeValueIsModal()
      }else{
        cinetpayStore.paymentCinetpay(payload);
      }
    };
    return{
      isChangeProfil,
      handleMyStatutOfBase,
      statutOfBase,
      handleChangeProfil,
        createAbonement,
    }
})