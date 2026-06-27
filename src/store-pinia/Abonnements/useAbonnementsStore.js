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
        const photo = ref(null);
        const treatment_preferentiel = ref(null);
        const diplome = ref(null);
        const profilHybride = ref([]);
        const ville = ref(null);
        const commune = ref(null);
        const quartier = ref(null);
        const statut_professionnel_artisan = ref(null);
        const upload = ref(null);
        const Phonegerant = ref(null);
        const contact = ref(null);
        const matricule_cc = ref(null);
        const juridique = ref(null);
        const ncc = ref(null);
        const phone = ref(null);
        const email = ref(null);
        const gerant = ref(null);
        const countryCodePhoneGerant = ref(null);
        const countryCode = ref(null);
        const email_cc = ref(null);
        const statut_entreprise = ref(null)
        const nom = ref(null);
        const registre_pdf = ref(null);
        const logo_entreprise = ref(null);

   const handleChangeProfil = (payload)=>{
    isChangeProfil.value = payload
   }
   const handleHybrideAddProfil = (payload)=>{
    addProfilHybride.value = payload
   }
   const cleanProfilHybide = (payload)=>{
    profilHybride.value = payload
   }
const handleChangeInfoForAbonnement = (payload) => {
    console.info("handleChangeInfoForAbonnement_send", payload);
  // Toujours vérifier que payload est un objet
  if (!payload || typeof payload !== "object") {
    console.error("handleChangeInfoForAbonnement : payload invalide", payload);
    return;
  }
if ("nom" in payload) {
    nom.value = payload.nom;
  }

  if ("niveauExpertise" in payload) {
    niveauExpertise.value = payload.niveauExpertise;
  }
  if ("upload" in payload) {
    upload.value = payload.upload;
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
  if ("photo" in payload) {
    photo.value = payload.photo;
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
  if ("registre_pdf" in payload) {
    registre_pdf.value = payload.registre_pdf;
  }

  if ("logo_entreprise" in payload) {
    logo_entreprise.value = payload.logo_entreprise;
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
 if ("contact" in payload) {
  contact.value = payload.countryCode+payload.contact;
}

if ("matricule_cc" in payload) {
  matricule_cc.value = payload.matricule_cc;
}

if ("juridique" in payload) {
  juridique.value = payload.juridique;
}

if ("ncc" in payload) {
  ncc.value = payload.ncc;
}

if ("phone" in payload) {
  phone.value = payload.phone;
}

if ("email" in payload) {
  email.value = payload.email;
}

if ("gerant" in payload) {
  gerant.value = payload.gerant;
}

if ("Phonegerant" in payload) {
  Phonegerant.value = payload.countryCodePhoneGerant+payload.Phonegerant;
}
if("email_cc" in payload){
  email_cc.value = payload.email_cc
}
if("statut_entreprise" in payload){
  statut_entreprise.value = payload.statut_entreprise
}

};
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
         photo,
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
        statut_professionnel_artisan,
        cleanProfilHybide,
        Phonegerant,
         contact,
         matricule_cc,
         upload,
         juridique ,
         registre_pdf,
         logo_entreprise,
         ncc ,
         phone ,
         email ,
         gerant ,
         countryCodePhoneGerant,
         countryCode,
         email_cc,
         statut_entreprise,
         nom
    }
})