<script setup>
import { defineProps, ref,onMounted } from "vue";
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
defineProps({
  abonnements: Array,
  type_abonnements: String,
});
const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
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
      <h1 class="text-center main-color">{{ item.libelle }}</h1>
      <p class="text-start">{{ item.periode }} {{texte}}</p>
      <div class="px-5" v-html="item.description"></div>
      <hr />
      <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1 class="text-start" style="font-size: 4em">{{ item.prix }}F</h1>
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
