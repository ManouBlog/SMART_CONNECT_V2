<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../utils";
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";

defineProps({
  abonnements: Array,
  type_abonnements: String,
});


const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeEntreprise = useEntreprisesStore();
const userConnected = ref(localStorage.getItem('user'))
const elmentsOfBtn = ref(null);
const texte = ref(null);
const select_mode_payment = ref("")
const select_mode_payment_tab = ref('Mois')




const handleCreateMonth =(payload)=>{
  console.log("handleCreateMonth",payload)

  const randomPart = Math.random().toString(36).substring(2);
       
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            mode_payment:"month",
            transaction_id:randomPart
        }
  console.log("handleConfirmationPayement",data)
storeAbonnement.createAbonement(data)
}
const handleCreateEntreprise=(payload)=>{
  const randomPart = Math.random().toString(36).substring(2);
        // console.log("payload",payload)
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            transaction_id:randomPart
        }
  storeAbonnement.createAbonement(data)
}

const handleCreateYear =(payload)=>{
  console.log("handleCreateYear",payload)
   const randomPart = Math.random().toString(36).substring(2);
       
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            mode_payment:"year",
            transaction_id:randomPart
        }
  console.log("handleConfirmationPayement",data)
  storeAbonnement.createAbonement(data)
}

const handleSelect_mode_Payement = (e) => {
  select_mode_payment.value = e
  console.log(e)
  console.log("select_mode_payment.value",select_mode_payment.value)
};



// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return userConnected.value;
});

// Watch déclenche le chargement des abonnements
watch(
  isUserConnected,
 (newValue) => {
    // console.log("NEW VALUE", isUserConnected);
    if (!newValue) {
     storeEntreprise.putPlanAbonnementAtNull();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate("Choisir cette formule"),
      color_btn: "primary",
    },
  ];

  texte.value = await transalteStore.handleTranslate("année");
  if (isUserConnected.value) {
      await storeEntreprise.get_all_abonnement();
    }
});
</script>

<template>
  <div class="conteneur-flex">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      :class="
        item?.categorie?.categorie == 'Etudiant'
          ? 'abonnement-classique_etudiant'
          : 'abonnement-classique_entreprise'
      "
    >
   
      <h1 class="text-center main-color">
        {{ item.libelle }}
        <span
          v-if="storeEntreprise?.planAbonnement?.id === item.id"
          class="badge bg-info"
        >
          Formule
        </span>
      </h1>
    <div v-if="item?.categorie && item?.categorie?.categorie == 'Etudiant'">
<n-tabs 
     v-model:value="select_mode_payment_tab" 
     type="segment" 
     @update:value="handleSelect_mode_Payement" 
     style="margin:1em 0;">
     <n-tab-pane name="Mois" tab="Mois" />
      <n-tab-pane name="Année" tab="Année" />
    </n-tabs>
    <section v-if="select_mode_payment_tab === 'Année'">
         <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <h1 style="font-size: 2em; font-weight: bold">
            {{ Help.convertInMoney(item.prix) }} F
          </h1>
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>
     <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>
      <div class="conteneur-btn">
     
        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateYear(item)"
        />
      </div>
    </section>
    <section v-if="select_mode_payment_tab === 'Mois'">
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <h1 style="font-size: 2em; font-weight: bold">
            {{ Help.convertInMoney(item.price_month) }} F
          </h1>
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">mois</h3>
        </div>
    <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description_month"></div>
      </div>
      <div class="conteneur-btn">
        
        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateMonth(item)"
        />
      </div>
    </section>
    </div>
    <section v-else>
       <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <h1 style="font-size: 2em; font-weight: bold">
            {{ Help.convertInMoney(item.prix) }} F
          </h1>
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
       

        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateEntreprise(item)"
        />
      </div>
    </section>
    </div>
  </div>
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
