<script setup>
import { ref, computed ,defineProps,onMounted,watch } from 'vue';

import { Help } from '../../../utils';
import { useStore } from 'vuex'
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";

const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();
const elmentsOfBtn = ref(null);
const modePaymentForFormuleAbonnementOfUserConnected = ref(null)
const texte = ref(null);
const formuleAbonnementOfUserConnected = ref(null)
const store = useStore();

const select_mode_payment_tab = ref('year')

const props = defineProps({
  item: Object,
  elmentsOfBtn: Array,
  type_abonnements:String
})

const tabs = ref([
  { id: 'year', label: 'Année' },
  { id: 'month', label: 'Mois' }
])

 watch(
      () => store.state.user,
      (newUser,oldUser) => {
        console.log('User changé:', oldUser)
        if(!newUser){
          
          const payload = {profilHybride:[]}
       storeAbonnement.handleChangeInfoForAbonnement(payload)
        }
      },
      { immediate: true, deep: true }
    )

// console.log("PROPSITEM",props.item)

const currentConfig = computed(() => {
  const formule = storeAbonnementUser?.planAbonnement?.mode_payment;
  // console.log('storeAbonnement.addProfilHybride',storeAbonnement.addProfilHybride)
  const countprofilHybride = storeAbonnement?.addProfilHybride?.length
  if (select_mode_payment_tab.value === 'year') {
     
    return {
      price: props.item.prix,
      priceWithProfilHybride: Help.calculateAbonnementForAddProfilHybridePrice(props.item.prix,countprofilHybride),
      isFormule: formule === 'year' || !formule,
      description: props.item.description,
      suffix: 'an',
      action: () => handleCreate('year')
    }
  }

  return {
    price: props.item.price_month,
    priceWithProfilHybride: Help.calculateAbonnementForAddProfilHybridePrice(props.item.price_month,countprofilHybride),
    isFormule: formule === 'month',
    description: props.item.description_month,
    suffix: 'mois',
    action: () => handleCreate('month')
  }
})

 const messageAbonnement = computed(() => {
  const type = props.type_abonnements;
  const libelle = props.item?.libelle?.trim().toUpperCase();

  if (type === "Etudiant") {
    const mapMessages = {
      "BROBROLI": "Commence maintenant",
      "BROBROLI+": "Je passe à BROBROLI+",
    };

    return mapMessages[libelle] || "Je passe à Brobroli";
  }
   if (type.includes("Artisan")) {
    const mapMessages = {
      "BROBROLI": "Trouve tes premiers clients",
      "BROBROLI+": "Deviens PLUS dans ta zone",
    };

    return mapMessages[libelle] || "Choisirqsdf cette formule";
  }

  if (type.includes("Particulier")) {
    const mapMessages = {
      "BROBROLI HOME": "Créer mon compte BROBROLI PRO",
      "BROBROLI HOME MAX": "Passer à BROBROLI PRO MAX",
    };

    return mapMessages[libelle] || "Choisir cette formule";
  }

  return "Ajouter";
});

const currentNotAbonnamentSuccessConfig = computed(() => {
  const formule = storeAbonnementUser?.planAbonnement?.mode_payment;
  console.log('storeAbonnement.addProfilHybride',storeAbonnement.addProfilHybride)
  const countprofilHybride = storeAbonnement?.addProfilHybride?.length
  if (select_mode_payment_tab.value === 'year') {
     
    return {
      price: props.item.prix,
      priceWithProfilHybride: Help.calculateAbonnementPrice(props.item.prix,countprofilHybride),
      isFormule: formule === 'year' || !formule,
      description: props.item.description,
      suffix: 'an',
      action: () => handleCreate('year')
    }
  }

  return {
    price: props.item.price_month,
    priceWithProfilHybride: Help.calculateAbonnementPrice(props.item.price_month,countprofilHybride),
    isFormule: formule === 'month',
    description: props.item.description_month,
    suffix: 'mois',
    action: () => handleCreate('month')
  }
})

function handleCreate(type) {
  console.log("ITEM",props.item)
  console.log('TYPE',type)
  if (type === 'year') {
    handleCreateYear(props.item)
  } else {
    handleCreateMonth(props.item)
  }
}
const handleCreateMonth =(payload)=>{
  console.log("handleCreateAbonnement123")
  console.log("handleCreateMonth",payload)
  console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
  const storeAbonnement = useAbonnementsStore();
  const randomPart = Math.random().toString(36).substring(2);
  const statutBaseUser = store.state.user?.user?.statut_base;
  console.log('statutBaseUser',statutBaseUser)
      const formData = new FormData();

if (payload.id) formData.append("abonement_id", payload.id);

formData.append("channels", "undefined");

if (select_mode_payment_tab.value) {
  formData.append("mode_payment", select_mode_payment_tab.value);
}

if (randomPart) {
  formData.append("transaction_id", randomPart);
}

// logique inchangée (toujours true)
formData.append("isAddProfilHybride", true);

if (storeAbonnement.statutOfBase || statutBaseUser) {
  formData.append(
    "statut_base",
    storeAbonnement.statutOfBase || statutBaseUser
  );
}

if (storeAbonnement.treatment_preferentiel) {
  formData.append(
    "treatment_preferentiel",
    storeAbonnement.treatment_preferentiel
  );
}

if (storeAbonnement.niveauExpertise) {
  formData.append("niveauExpertise", storeAbonnement.niveauExpertise);
}

if (storeAbonnement.modeTravail) {
  formData.append("modeTravail", storeAbonnement.modeTravail);
}

if (storeAbonnement.tempsTravail) {
  formData.append("tempsTravail", storeAbonnement.tempsTravail);
}

if (storeAbonnement.niveauEtude) {
  formData.append("niveauEtude", storeAbonnement.niveauEtude);
}

if (storeAbonnement.CVupload) {
  formData.append("CVupload", storeAbonnement.CVupload);
}

if (storeAbonnement.photo) {
  formData.append("photo", storeAbonnement.photo);
}

if (storeAbonnement.commune) {
  formData.append("commune", storeAbonnement.commune);
}

if (storeAbonnement.ville) {
  formData.append("ville", storeAbonnement.ville);
}

if (storeAbonnement.quartier) {
  formData.append("quartier", storeAbonnement.quartier);
}

if (storeAbonnement.statut_professionnel_artisan) {
  formData.append(
    "statut_professionnel_artisan",
    storeAbonnement.statut_professionnel_artisan
  );
}

if (storeAbonnement.statut_talent) {
  formData.append("statut_talent", storeAbonnement.statut_talent);
}

if (storeAbonnement.profilHybride?.length) {
  storeAbonnement.profilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("profilHybride[]", id);
    });
}

if (storeAbonnement.addProfilHybride?.length) {
  storeAbonnement.addProfilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("addProfilHybrideOnly[]", id);
    });
}
  console.log("paiement_month_pouraddprofilhybride",formData)
storeAbonnement.createAbonement(formData)
}
const handleCreateYear =(payload)=>{
  console.log("handleCreateAbonnement90")
  console.log("handleCreateYear",payload)
  console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
  console.log("storeAbonnement",storeAbonnement)
   const randomPart = Math.random().toString(36).substring(2);
  const statutBaseUser = store.state.user?.user?.statut_base;
  console.log('statutBaseUser',statutBaseUser)
      const formData = new FormData();

// Ajout des champs simples
if (payload.id) formData.append('abonement_id', payload.id);
if (select_mode_payment_tab?.value) formData.append('mode_payment', select_mode_payment_tab.value);
if (randomPart) formData.append('transaction_id', randomPart);

// Ajout des booléens et statuts
formData.append('isAddProfilHybride', storeAbonnement.addProfilHybride.map(item => item.id).length > 0);
formData.append('statut_base', storeAbonnement.statutOfBase || statutBaseUser);
formData.append('isChangeProfil', storeAbonnement.isChangeProfil);

// Ajout des autres propriétés
if (storeAbonnement.treatment_preferentiel) formData.append('treatment_preferentiel', storeAbonnement.treatment_preferentiel);
if (storeAbonnement.niveauExpertise) formData.append('niveauExpertise', storeAbonnement.niveauExpertise);
if (storeAbonnement.modeTravail) formData.append('modeTravail', storeAbonnement.modeTravail);
if (storeAbonnement.tempsTravail) formData.append('tempsTravail', storeAbonnement.tempsTravail);
if (storeAbonnement.niveauEtude) formData.append('niveauEtude', storeAbonnement.niveauEtude);
if (storeAbonnement.CVupload) formData.append('CVupload', storeAbonnement.CVupload);
if (storeAbonnement.statut_talent) formData.append('statut_talent', storeAbonnement.statut_talent);

// Ajout des tableaux avec JSON.stringify pour Laravel
if (storeAbonnement.profilHybride?.length) {
  storeAbonnement.profilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("profilHybride[]", id);
    });
}

if (storeAbonnement.addProfilHybride?.length) {
  storeAbonnement.addProfilHybride
    .map(item => item.id)
    .forEach(id => {
      formData.append("addProfilHybrideOnly[]", id);
    });
}
// Autres champs
if (storeAbonnement.nom) formData.append('nom', storeAbonnement.nom);
if (storeAbonnement.expertise) formData.append('expertise', storeAbonnement.expertise);
if (storeAbonnement.photo) formData.append('photo', storeAbonnement.photo);
if (storeAbonnement.diplome) formData.append('diplome', storeAbonnement.diplome);
if (storeAbonnement.ville) formData.append('ville', storeAbonnement.ville);
if (storeAbonnement.commune) formData.append('commune', storeAbonnement.commune);
if (storeAbonnement.quartier) formData.append('quartier', storeAbonnement.quartier);
if (storeAbonnement.statut_professionnel_artisan) formData.append('statut_professionnel_artisan', storeAbonnement.statut_professionnel_artisan);
if (storeAbonnement.statut_entreprise) formData.append('statut_entreprise', storeAbonnement.statut_entreprise);
if (storeAbonnement.email_cc) formData.append('email_cc', storeAbonnement.email_cc);
if (storeAbonnement.Phonegerant) formData.append('Phonegerant', storeAbonnement.Phonegerant);
if (storeAbonnement.gerant) formData.append('gerant', storeAbonnement.gerant);
if (storeAbonnement.email) formData.append('email', storeAbonnement.email);
if (storeAbonnement.phone) formData.append('phone', storeAbonnement.phone);
if (storeAbonnement.ncc) formData.append('ncc', storeAbonnement.ncc);
if (storeAbonnement.juridique) formData.append('juridique', storeAbonnement.juridique);
if (storeAbonnement.matricule_cc) formData.append('matricule_cc', storeAbonnement.matricule_cc);
if (storeAbonnement.contact) formData.append('contact', storeAbonnement.contact);
  
  console.log("veux_ajouter_des_profils_hybrides_year98",formData)
  storeAbonnement.createAbonement(formData)
}



function handleSelect_mode_Payement(val) {
  select_mode_payment_tab.value = val
}
onMounted(async () => {
   elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate(messageAbonnement.value),
      color_btn: "primary",
    },
  ];
  console.log("INFO_SUR_USER",store.state.user)
  console.log("ISCHANGE_PROFIL_INCONTENTABONNENEMENT_FORADDHYBRIDES",storeAbonnement.isChangeProfil)
  if(storeAbonnement.isChangeProfil){
 const statutBase = store.state.user?.user?.statut?.statut;
  const AllProfilHybride = store.state.user?.user?.statuses?.filter(item=>item.statut !== statutBase)
  console.log("AllProfilHybride",AllProfilHybride)
   const payload = {profilHybride:AllProfilHybride}
  storeAbonnement.handleChangeInfoForAbonnement(payload)
  }

  if(storeAbonnement.addProfilHybride.length){
    const profilUserCurrent = store.state.user?.user?.abonement?.find(item=>item?.statut === 'success')
    formuleAbonnementOfUserConnected.value = profilUserCurrent?.abonement?.libelle;
    modePaymentForFormuleAbonnementOfUserConnected.value = profilUserCurrent?.mode_payment;
    if(formuleAbonnementOfUserConnected.value){
   tabs.value = tabs.value.filter(tab=>tab.id === modePaymentForFormuleAbonnementOfUserConnected.value)
    select_mode_payment_tab.value = tabs.value[0].id
    }
    console.log("PROFIL_HYBRIDE_ADD_CONTENT_ABONNEMENT",storeAbonnement.addProfilHybride)
    console.log("profilUserCurrent",profilUserCurrent)
    console.log("tabs",tabs.value)
    console.log("modePaymentForFormuleAbonnementOfUserConnected",modePaymentForFormuleAbonnementOfUserConnected.value)
    console.log("formuleAbonnementOfUserConnected25",formuleAbonnementOfUserConnected.value)
  }
 
  texte.value = await transalteStore.handleTranslate("année");
});
</script>
<template>
 
  <div v-if="!storeAbonnement.addProfilHybride.length">
     <!-- <p>zedfzefhze87:{{ formuleAbonnementOfUserConnected }}</p>
  <p>tabs:{{ tabs }}</p> -->
 <n-tabs
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;"
>
  <n-tab-pane
    v-for="tab in tabs"
    :key="tab.id"
    :name="tab.id"
    :tab="tab.label"
  />
</n-tabs>

<section>
  <p style="text-align:center;position: absolute;right: 0;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
          class="badge"
        style="background-color: white;color:black;"
        >
          Active
        </span>
  </p>
 
  <div class="d-flex gap-5 align-items-center justify-content-center main-color">
      <div style="display: flex;flex-direction: column;">
   <h1 
    :style="{
    fontSize: '2em',
    fontWeight: 'bold',
    padding: '0',
    margin: '0',
    textDecoration: currentConfig.priceWithProfilHybride != currentConfig.price ? 'line-through' : 'none'
  }">
      {{ Help.convertInMoney(currentConfig.price) }} F
    </h1>
    <h1 
     v-if="currentConfig.priceWithProfilHybride != currentConfig.price"
    style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
      {{ Help.convertInMoney(currentConfig.priceWithProfilHybride) }} F
    </h1>
  </div>
    <h3 class="mx-2" style="font-size: 1.3em; color: white">/</h3>
    <h3 style="font-size: 2em; color:white">
      {{ currentConfig.suffix }}
    </h3>
  </div>
  <div style="height: 310px; position: relative; padding: 1em">
    <div class="px-5" v-html="currentConfig.description"></div>
  </div>

  <div class="conteneur-btn">
    <Buttons
      :elmentsOfBtn="elmentsOfBtn"
      shapeBtn="round"
      @created="currentConfig.action"
    />
  </div>
</section>
</div>
  <div v-if="storeAbonnement.addProfilHybride.length && 
  formuleAbonnementOfUserConnected == item.libelle">
   <!-- <p>zedfzefhze34:{{ formuleAbonnementOfUserConnected }}</p>
  <p>tabs:{{ tabs }}</p> -->
   <n-tabs
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;"
>
  <n-tab-pane
    v-for="tab in tabs"
    :key="tab.id"
    :name="tab.id"
    :tab="tab.label"
  />
</n-tabs>

<section>
  <p style="text-align:center;position: absolute;right: 0;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
          class="badge"
          style="background-color: white;color:black;"
        >
          Active
        </span>
  </p>
 
  <div class="d-flex gap-5 align-items-center justify-content-center main-color">
      <div style="display: flex;flex-direction: column;">
   <h1 
    :style="{
    fontSize: '2em',
    fontWeight: 'bold',
    padding: '0',
    margin: '0',
    textDecoration: currentConfig.priceWithProfilHybride != currentConfig.price ? 'line-through' : 'none'
  }">
      {{ Help.convertInMoney(currentConfig.price) }} F
    </h1>
    <h1 
     v-if="currentConfig.priceWithProfilHybride != currentConfig.price"
    style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
      {{ Help.convertInMoney(currentConfig.priceWithProfilHybride) }} F
    </h1>
  </div>
    <h3 class="mx-2" style="font-size: 1.3em; color: white">/</h3>
    <h3 style="font-size: 2em; color:white">
      {{ currentConfig.suffix }}
    </h3>
  </div>
  <div style="height: 310px; position: relative; padding: 1em">
    <div class="px-5" v-html="currentConfig.description"></div>
  </div>

  <div class="conteneur-btn">
    <Buttons
      :elmentsOfBtn="elmentsOfBtn"
      shapeBtn="round"
      @created="currentConfig.action"
    />
  </div>
</section>
  </div>
  <div v-if="storeAbonnement.addProfilHybride.length &&
   !formuleAbonnementOfUserConnected">
    <!-- <p>zedfzefhze23:{{ formuleAbonnementOfUserConnected }}</p>
  <p>tabs:{{ tabs }}</p> -->
   <n-tabs
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;"
>
  <n-tab-pane
    v-for="tab in tabs"
    :key="tab.id"
    :name="tab.id"
    :tab="tab.label"
  />
</n-tabs>

<section>
  <p style="text-align:center;position: absolute;right: 0;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
          class="badge"
          style="background-color: white;color:black;"
        >
          Active
        </span>
  </p>
 
  <div class="d-flex gap-5 align-items-center justify-content-center main-color">
      <div style="display: flex;flex-direction: column;">
   <h1 
    :style="{
    fontSize: '2em',
    fontWeight: 'bold',
    padding: '0',
    margin: '0',
    textDecoration: currentNotAbonnamentSuccessConfig.priceWithProfilHybride != currentNotAbonnamentSuccessConfig.price ? 'line-through' : 'none'
  }">
      {{ Help.convertInMoney(currentNotAbonnamentSuccessConfig.price) }} F
    </h1>
    <h1 
     v-if="currentNotAbonnamentSuccessConfig.priceWithProfilHybride != currentNotAbonnamentSuccessConfig.price"
    style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
      {{ Help.convertInMoney(currentNotAbonnamentSuccessConfig.priceWithProfilHybride) }} F
    </h1>
  </div>
    <h3 class="mx-2" style="font-size: 1.3em; color: white">/</h3>
    <h3 style="font-size: 2em; color:white">
      {{ currentNotAbonnamentSuccessConfig.suffix }}
    </h3>
  </div>
  <div style="height: 310px; position: relative; padding: 1em">
    <div class="px-5" v-html="currentNotAbonnamentSuccessConfig.description"></div>
  </div>

  <div class="conteneur-btn">
    <Buttons
      :elmentsOfBtn='elmentsOfBtn'
      shapeBtn="round"
      @created="currentNotAbonnamentSuccessConfig.action"
    />
  </div>
</section>
  </div>
   

</template>
<style scoped>

.btn-confirm {
  background-color: orange;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border: none;
  padding: 1em;
  border-radius: 10px;
  transition: all 0.2s ease;
}

/* ÉTAT DISABLED */
.btn-confirm:disabled {
  background-color: #d1d1d1;
  color: #888;
  cursor: not-allowed;
  opacity: 0.7;
}
:deep(.my-custom-paragraph) {
  font-size: 16px !important;
  margin-top: 1em;
}
.conteneur-flex {
  display: flex !important;
  justify-items: center !important;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
}
.cart_modal{
  background-color: white;
  box-shadow: 1px 1px 1px solid rgba(0, 0, 0, 0.379);
  height:300px;
  width:90%;
  padding:1em;
  overflow: auto;
  border-radius: 10px;
}
.cart_modal select{
  border-radius: 10px;
}
.modal_choose_periode{
  position:fixed;
  display: flex;
  z-index: 999;
  width:100%;
  justify-content: center;
  place-content: center;
  align-items: center;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.299);
}
.main-color {
  color: rgb(254, 254, 254);
}
.conteneur-btn {
  height: 120px;
}
</style>