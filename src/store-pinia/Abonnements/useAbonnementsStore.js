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
    const niveauExpertise =  ref(null);
        const modeTravail =  ref(null);
        const tempsTravail =  ref(null);
        const niveauEtude =  ref(null);
        const CVupload =  ref(null);
        const statut_talent = ref(null);
        const upload = ref(null);
        const treatment_preferentiel = ref(null);
        const diplome = ref(null);

   const handleChangeProfil = (payload)=>{
    isChangeProfil.value = payload
   }
   const handleChangeInfoForAbonnement=(payload)=>{
     niveauExpertise.value =  payload.niveauExpertise;
         modeTravail.value =  payload.modeTravail;
         tempsTravail.value =  payload.tempsTravail;
         niveauEtude.value =  payload.niveauEtude;
         CVupload.value =  payload.CVupload;
          upload.value =  payload.upload;
         statut_talent.value = payload.statut_talent;
         treatment_preferentiel.value = payload.treatment_preferentiel,
         diplome.value = payload.diplome
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
      handleChangeInfoForAbonnement,
      niveauExpertise,
         modeTravail,
         tempsTravail,
         niveauEtude,
         CVupload,
         upload,
         statut_talent,
         diplome,
         treatment_preferentiel,
      handleMyStatutOfBase,
      statutOfBase,
      handleChangeProfil,
        createAbonement,
    }
})