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
const handleCreate = (id) => {
  storeAbonnement.createAbonement(id);
};
onMounted(async () => {
  elmentsOfBtn.value = [
  {
    name_btn: await transalteStore.handleTranslate("Choisir cette formule"),
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
      :class="item?.categorie?.categorie == 'Etudiant'? 'abonnement-classique_etudiant':'abonnement-classique_entreprise'"
    >
      <h1 class="text-center main-color">{{ item.libelle }} 
        <span v-if="storeEntreprise?.planAbonnement?.id === item.id" class="badge bg-info">Formule</span>
      </h1>
      <div style="height:310px;position:relative;padding:1em;">
     <div class="px-5" v-html="item.description"></div>      
      </div>
      

      <div class="conteneur-btn">
        <div class="d-flex align-items-center gap-5 justify-content-center main-color">
        <h1  style="font-size: 2em;font-weight:bold">{{ Help.convertInMoney(item.prix) }}F</h1>
        <span class="mx-2">/</span>
        <span style="font-size: 2em">an</span>
      </div>
        <Buttons
          :isDisabled="storeEntreprise?.planAbonnement?.id === item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreate(item.id)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.my-custom-paragraph){
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
.main-color{
  color:orange;
}
</style>
