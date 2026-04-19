<script setup>
import { ref, computed ,defineProps,onMounted} from 'vue';

import { Help } from '../../../utils';
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";

const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();
const elmentsOfBtn = ref(null);
const texte = ref(null);

const select_mode_payment_tab = ref('year')

const props = defineProps({
  item: Object,
  elmentsOfBtn: Array,
  // isChangeProfil:{
  //   type:Boolean,
  //   default:false
  // }
})

const tabs = [
  { id: 'year', label: 'Année' },
  { id: 'month', label: 'Mois' }
]

// console.log("PROPSITEM",props.item)

const currentConfig = computed(() => {
  const formule = storeAbonnementUser?.planAbonnement?.mode_payment;
  if (select_mode_payment_tab.value === 'year') {
     
    return {
      price: props.item.prix,
      isFormule: formule === 'year' || !formule,
      description: props.item.description,
      suffix: 'an',
      action: () => handleCreate('year')
    }
  }

  return {
    price: props.item.price_month,
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
  console.log("handleCreateMonth",payload)
  console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
  const randomPart = Math.random().toString(36).substring(2);
       
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            mode_payment:select_mode_payment_tab.value,
            transaction_id:randomPart,
            isChangeProfil:storeAbonnement.isChangeProfil,
            statut_base:storeAbonnement.statutOfBase,
             niveauExpertise : storeAbonnement.niveauExpertise ,
        modeTravail : storeAbonnement.modeTravail ,
        tempsTravail : storeAbonnement.tempsTravail ,
        niveauEtude : storeAbonnement.niveauEtude ,
        CVupload : storeAbonnement.CVupload ,
        statut_talent : storeAbonnement.statut_talent ,
        }
  console.log("handleConfirmationPayement",data)
storeAbonnement.createAbonement(data)
}
const handleCreateYear =(payload)=>{
  console.log("handleCreateYear",payload)
  console.log("select_mode_payment_tab.value",select_mode_payment_tab.value)
   const randomPart = Math.random().toString(36).substring(2);
       
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            mode_payment:select_mode_payment_tab.value,
            transaction_id:randomPart,
            isChangeProfil:storeAbonnement.isChangeProfil,
            statut_base:storeAbonnement.statutOfBase,
             niveauExpertise : storeAbonnement.niveauExpertise ,
        modeTravail : storeAbonnement.modeTravail ,
        tempsTravail : storeAbonnement.tempsTravail ,
        niveauEtude : storeAbonnement.niveauEtude ,
        CVupload : storeAbonnement.CVupload ,
        statut_talent : storeAbonnement.statut_talent ,
        }
  console.log("handleConfirmationPayement",data)
  storeAbonnement.createAbonement(data)
}



function handleSelect_mode_Payement(val) {
  select_mode_payment_tab.value = val
}
onMounted(async () => {
  elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate("Choisir cette formule"),
      color_btn: "primary",
    },
  ];

  texte.value = await transalteStore.handleTranslate("année");
});
</script>
<template>
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
  <p style="text-align:center;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id && currentConfig.isFormule"
          class="badge bg-warning"
        >
          Formule
        </span>
  </p>
 
  <div class="d-flex align-items-center gap-5 justify-content-center main-color">
    <h1 style="font-size: 2em; font-weight: bold">
      {{ Help.convertInMoney(currentConfig.price) }} F
    </h1>
    <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
    <h3 style="font-size: 2em; color: orange">
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

</template>
<style scoped>
:deep(.n-tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active){
  background-color:#25535f !important;
}
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
  color: orange;
}
.conteneur-btn {
  height: 120px;
}
</style>