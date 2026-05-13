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
const texte = ref(null);
const formuleAbonnementOfUserConnected = ref(null)
const store = useStore();

const select_mode_payment_tab = ref('year')

const props = defineProps({
  item: Object,
  elmentsOfBtn: Array,
  type_abonnements:{
    type:String,
    required:false
  }
})

const tabs = [
  { id: 'year', label: 'Année' },
  { id: 'month', label: 'Mois' }
]

 watch(
      () => store.state.user,
      (newUser) => {
       
        if(!newUser){
          
          const payload = {profilHybride:[]}
       storeAbonnement.handleChangeInfoForAbonnement(payload)
        }
      },
      { immediate: true, deep: true }
    )

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

    return mapMessages[libelle] || "Choisirzs cette formule";
  }

  return "Choisirdf cette formule";
});

const ecriteauFormule = (item) => {
  const categorie = item?.categorie?.categorie?.toLowerCase();
  const libelle = item?.libelle?.toUpperCase();

  const rules = {
   
    'maitre artisan':{
      "BROBROLI+":
        "Pour être le premier appelé , sur les urgences comme sur les gros chantiers.",

      "BROBROLI":
        "Pour que tes clients te trouvent. Pour que tes marchés te croisent.",
    },
  'artisan':{
      "BROBROLI+":
        "Pour être le premier appelé,sur les urgences comme sur les gros chantiers.",

      "BROBROLI":
        "Pour que tes clients te trouvent. Pour que tes marchés te croisent.",
    },
  };

  return rules?.[categorie]?.[libelle] || "Choisiref cette formule";
};


const currentConfig = computed(() => {
  const formule = storeAbonnementUser?.planAbonnement?.mode_payment;

  const countprofilHybride = storeAbonnement?.profilHybride?.length || storeAbonnement?.addProfilHybride.length
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
  // console.log("ITEM",props.item)
  console.log('TYPE',type)
  if (type === 'year') {
    handleCreateYear(props.item)
  } else {
    handleCreateMonth(props.item)
  }
}
const handleCreateMonth =(payload)=>{
  // console.log("handleCreateAbonnement909889")
  // console.log("handleCreateMonth",payload)
  // console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
  const randomPart = Math.random().toString(36).substring(2);
  const formData = new FormData();

if (payload.id) formData.append("abonement_id", payload.id);
if (select_mode_payment_tab.value) formData.append("mode_payment", select_mode_payment_tab.value);
if (randomPart) formData.append("transaction_id", randomPart);

if (storeAbonnement.isChangeProfil != null) {
  formData.append("isChangeProfil", storeAbonnement.isChangeProfil);
}

if (storeAbonnement.statutOfBase) {
  formData.append("statut_base", storeAbonnement.statutOfBase);
}

if (storeAbonnement.treatment_preferentiel) {
  formData.append("treatment_preferentiel", storeAbonnement.treatment_preferentiel);
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
  // console.log("PAIEMENT_ARTISAN_month",formData)
storeAbonnement.createAbonement(formData)
}
const handleCreateYear =(payload)=>{
  // console.log("handleCreateAbonnement56HS")
  // console.log("handleCreateYear",payload)
  // console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
    const statutBaseUser = store.state.user?.user?.statut_base;
   const randomPart = Math.random().toString(36).substring(2);
        
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
if (storeAbonnement.photo) formData.append('photo', storeAbonnement.photo);

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
  if(storeAbonnement.addProfilHybride.length){
    const profilUserCurrent = store.state.user?.user?.abonement?.find(item=>item.statut === 'success')
    formuleAbonnementOfUserConnected.value = profilUserCurrent?.abonement?.libelle || null;

    // console.log("PROFIL_HYBRIDE_ADD_CONTENT_ABONNEMENT",storeAbonnement.addProfilHybride)
    // console.log("profilUserCurrent",profilUserCurrent)
    // console.log("formuleAbonnementOfUserConnected23",formuleAbonnementOfUserConnected.value)
  }

  texte.value = await transalteStore.handleTranslate("année");
});
</script>
<template>   
  <p class="shadow-sm p-2 small" 
      style="font-weight: bold;
      text-align:center;
      background-color: rgb(255 255 255 / 40%);
      padding:0.5em;
      height: 80px;
     display: flex;
     flex-direction: column;
     justify-content: center;
      ">
      {{ ecriteauFormule(item) }}
     </p>
 
  <div v-if="!storeAbonnement.addProfilHybride.length">
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
         style="background-color: green;"
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
      :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
      :elmentsOfBtn="elmentsOfBtn"
      shapeBtn="round"
      @created="currentConfig.action"
    />
  </div>
</section>
</div>
  <div v-if="storeAbonnement.addProfilHybride.length && formuleAbonnementOfUserConnected == item.libelle">
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
          style="background-color: green;"
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
      :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
      :elmentsOfBtn="elmentsOfBtn"
      shapeBtn="round"
      @created="currentConfig.action"
    />
  </div>
</section>
  </div>

  <div v-if="storeAbonnement.addProfilHybride.length && !formuleAbonnementOfUserConnected">
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
          style="background-color: green;"
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
      :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
      :elmentsOfBtn="elmentsOfBtn"
      shapeBtn="round"
      @created="currentConfig.action"
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