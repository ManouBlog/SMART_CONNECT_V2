<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../utils";
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";

defineProps({
  abonnements: Array,
  type_abonnements: String,
});


const transalteStore = useTranslateStore();
// const storeAbonnement = useAbonnementsStore();
const storeEntreprise = useEntreprisesStore();
const userConnected = ref(localStorage.getItem('user'))
const elmentsOfBtn = ref(null);
const texte = ref(null);
const doPayment = ref(false);
const prixPayment = ref(0)

const prixAbonement= ref();
const select_mode_payment = ref("")
const select_month = ref("")

const closeDoPayment=()=>{
   doPayment.value = false
  prixAbonement.value = ""
  select_mode_payment.value = ""
  select_month.value = ""
  prixPayment.value = 0
 
}

const handleCreate = (item) => {
  console.log("handleCreate", item)

  prixAbonement.value = item.prix
  select_mode_payment.value = ""
  select_month.value = ""
  prixPayment.value = 0

  if (item.categorie.categorie === "Etudiant") {
    doPayment.value = true
  }
};

const handleSelect_mode_Payement = (e) => {
  select_mode_payment.value = e.target.value

  if (prixAbonement.value === 10000 && e.target.value === "monthly") {
    prixPayment.value = 1000
  } else if (prixAbonement.value === 20000 && e.target.value === "monthly") {
    prixPayment.value = 2000
  } else if (e.target.value === "year") {
    prixPayment.value = prixAbonement.value
    select_month.value = ""
  }
};
const handleConfirmationPayement=()=>{
console.log("prixPayment.value",{prix:prixPayment.value,payment:select_mode_payment.value,month:select_month.value})
 if(select_mode_payment.value === 'year'){
  console.log("une fois",prixPayment.value)
 }else{
  console.log("partiel",select_month.value*prixPayment.value)
 }
}


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
  <div class="modal_choose_periode" v-if="doPayment"
  @click.self="closeDoPayment"
  >
   <div class="cart_modal">
    <h3 style="font-weight:bold;">Mode de paiement</h3>
    <p style="text-align: center;">Abonnement de {{ new Intl.NumberFormat("de-DE").format(prixAbonement) }} Fcfa</p>
   <select v-model="select_mode_payment" 
   name="cart_modal" id="cart_modal"
   @change="handleSelect_mode_Payement"
   style="width:100%;height: auto;padding:1em;margin:1em 0;">
    <option value="" disabled>Sélectionnez un mode de paiement</option>
    <option value="year">Payer tout d'un coup</option>
    <option value="monthly">Payer par mois</option>
   </select>
   <select v-if="select_mode_payment === 'monthly'" 
   @change="handleMonthy"
   v-model="select_month"
   name="cart_monthly" id="cart_monthly" style="width:100%;height: auto;padding:1em;margin:1em 0;">
    <option value="" disabled>Sélectionnez le mois</option>
  <option
    v-for="n in Array.from({ length: 12 }, (_, i) => i + 1)"
    :key="n"
    :value="n"
  >
    {{ n }} mois
  </option>
   </select>
   <div style="text-align:right;">
    <button :disabled="!select_mode_payment || (!select_month && select_mode_payment === 'monthly')" 
    class="btn-confirm"
    @click.prevent="handleConfirmationPayement"
    >Confimer 
    <span v-if="prixPayment !== 0 || select_month*prixPayment !== 0">
      {{ select_mode_payment === 'year' ? new Intl.NumberFormat("de-DE").format(prixPayment):new Intl.NumberFormat("de-DE").format(select_month*prixPayment)  }}
    </span>
    </button>
   </div>
   </div>
  </div>
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

      <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
        <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <h1 style="font-size: 2em; font-weight: bold">
            {{ Help.convertInMoney(item.prix) }}F
          </h1>
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>

        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreate(item)"
        />
      </div>
    </div>
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
  color: orange;
}
.conteneur-btn {
  border-top: 1px solid white;
  height: 120px;
}
</style>
