<script setup>
import { defineProps, ref,onMounted } from "vue";
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
const elmentsOfBtn = ref(null);
const texte = ref(null)
const handleCreate = (id, price) => {
  storeAbonnement.createAbonement(id, price);
};
onMounted(async () => {
  elmentsOfBtn.value = [
  {
    name_btn: await transalteStore.handleTranslate("Choisir ce plan"),
    color_btn: "primary",
  },
]
texte.value = await transalteStore.handleTranslate("année")
 await storeEntreprise.get_all_abonnement();
});
</script>
<template>
  <div class="conteneur-flex">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      class="abonnement-classique"
    >
      <h1 class="text-center main-color">{{ item.libelle }} 
        <span v-if="storeEntreprise?.planAbonnement?.id === item.id" class="badge bg-info">Formule</span>
      </h1>
      <p class="text-start">{{ item.periode }} {{texte}}</p>
      <div style="height:310px;position:relative;">
     <div class="px-5" v-html="item.description"></div>
       <div style="position:absolute;bottom:0;">
     <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1  style="font-size: 2em;font-weight:bold">{{ Help.convertInMoney(item.prix) }}F</h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">an</span>
      </div>
       </div>
      
      </div>
      

      <div class="text-center conteneur-btn">
        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreate(item.id, item.prix)"
        />
      </div>
    </div>
  </div>
</template>
