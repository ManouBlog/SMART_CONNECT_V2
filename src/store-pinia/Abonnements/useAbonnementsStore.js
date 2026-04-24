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
   const addProfilHybride = ref([]);
    const niveauExpertise =  ref(null);
        const modeTravail =  ref(null);
        const tempsTravail =  ref(null);
        const niveauEtude =  ref(null);
        const CVupload =  ref(null);
        const statut_talent = ref(null);
        const upload = ref(null);
        const treatment_preferentiel = ref(null);
        const diplome = ref(null);
        const profilHybride = ref([]);
        const ville = ref(null);
        const commune = ref(null);
        const quartier = ref(null);
        const statut_professionnel_artisan = ref(null);

   const handleChangeProfil = (payload)=>{
    isChangeProfil.value = payload
   }
   const handleHybrideAddProfil = (payload)=>{
    addProfilHybride.value = payload
   }
const handleChangeInfoForAbonnement = (payload) => {
  // Toujours vérifier que payload est un objet
  if (!payload || typeof payload !== "object") {
    console.warn("handleChangeInfoForAbonnement : payload invalide", payload);
    return;
  }

  console.log("payload_handleChangeInfoForAbonnement ", payload);

  // Assigner seulement si la propriété existe dans payload
  if ("niveauExpertise" in payload) {
    niveauExpertise.value = payload.niveauExpertise;
  }
  if ("modeTravail" in payload) {
    modeTravail.value = payload.modeTravail;
  }
  if ("tempsTravail" in payload) {
    tempsTravail.value = payload.tempsTravail;
  }
  if ("niveauEtude" in payload) {
    niveauEtude.value = payload.niveauEtude;
  }
  if ("CVupload" in payload) {
    CVupload.value = payload.CVupload;
  }
  if ("upload" in payload) {
    upload.value = [payload.upload];
  }
  if ("statut_talent" in payload) {
    statut_talent.value = payload.statut_talent;
  }
  if ("treatment_preferentiel" in payload) {
    treatment_preferentiel.value = payload.treatment_preferentiel;
  }
  if ("diplome" in payload) {
    diplome.value = payload.diplome;
  }
  if ("ville" in payload) {
    ville.value = payload.ville;
  }
  if ("commune" in payload) {
    commune.value = payload.commune;
  }
  if ("profilHybride" in payload) {
    profilHybride.value = payload.profilHybride;
  }
  if ("quartier" in payload) {
    quartier.value = payload.quartier;
  }
  if ("statut_professionnel_artisan" in payload) {
    statut_professionnel_artisan.value = payload.statut_professionnel_artisan;
  }
};
   const handleMyStatutOfBase = (payload)=>{
    statutOfBase.value = payload;
   }
   const createAbonement = async (payload)=>{
    console.log("createAbonementlance",payload)
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
         profilHybride,
      handleMyStatutOfBase,
      statutOfBase,
      handleChangeProfil,
        createAbonement,
        handleHybrideAddProfil,
        addProfilHybride,
        commune,
        ville,
        quartier,
        statut_professionnel_artisan
    }
})