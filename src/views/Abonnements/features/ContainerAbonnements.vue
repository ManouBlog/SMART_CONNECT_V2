<script setup>
import { defineProps, ref } from "vue";
import Buttons from "../../../Shared/Compoments/Buttons.vue";

import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
defineProps({
  abonnements: Array,
  type_abonnements: String,
});
const storeAbonnement = useAbonnementsStore();
const elmentsOfBtn = ref([
  {
    name_btn: "Choisir ce plan",
    color_btn: "primary",
  },
]);
const handleCreate = (id, price) => {
  storeAbonnement.createAbonement(id, price);
};
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
      <h1 class="text-center main-color">{{ item.libelle }}</h1>
      <p class="text-start">{{ item.periode }} année</p>
      <div class="px-5" v-html="item.description"></div>
      <hr />
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        
        <h1 class="text-start" style="font-size:4em;">{{ item.prix }}F</h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">an</span>
      </div>

      <div class="text-center conteneur-btn">
        <Buttons
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreate(item.id, item.prix)"
        />
      </div>
    </div>
  </div>
</template>
