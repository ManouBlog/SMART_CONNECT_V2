<script setup>
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { ref, onMounted } from "vue";
import { useStore } from 'vuex';
import {useTranslateStore} from "../../store-pinia/Translate/useTranslateStore"
// import {mapActions} from "pinia"
import instance from "../../api/api";

// import i18n from "../../plugins/i18n";
import Swal from "sweetalert2";

import ContainerAbonnements from "./features/ContainerAbonnements.vue";
// const { t } = i18n.global;
const text = ref("")
const store = useStore();

// const 'Etudiant' = ref("")
// const text3 = ref("") 

const translateStore = useTranslateStore();
const defaulValueTranslate = ref(translateStore.defaultLocale);
console.log("defaulValueTranslate",defaulValueTranslate.value)
const abonnements = ref([]);
// const texteStudent = ref(null);
// const texteEntreprise = ref(null);
const loadingSpinner = useLoadingSpinner();
// const isLoading = ref(true);

const handleAbonement = async () => {
  loadingSpinner.launchLoading(true);
  try {
    const response = await instance.get("getAbonnement");
    abonnements.value = response.data.data;
    console.log("RESPONSE_getAbonnement", response.data);
    loadingSpinner.launchLoading(false);
    // isLoading.value = false;
  } catch (error) {
    console.log(error);
    loadingSpinner.launchLoading(false);
    // isLoading.value = false;
  }
};

const verifIfAbonnementIsSuccess = async () => {
  const TRANSACTION_ID = localStorage.getItem("transaction_id");
  if (TRANSACTION_ID) {
    try {
      const response = await instance.post(
        "cintepay/verification_paiement/" + TRANSACTION_ID
      );
      if (response["status"] === 200) {
        Swal.fire({
          icon: "info",
          title: response.data.message,
          showConfirmButton: true,
        });
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "info",
        title: error.response.data.message,
        showConfirmButton: true,
      });
    }
    localStorage.removeItem("transaction_id");
  } else {
    return;
  }
};

onMounted(async () => {
  verifIfAbonnementIsSuccess();
  handleAbonement();
  text.value = await translateStore.handleTranslate("Choisissez votre formule")
  // texteStudent.value = await translateStore.handleTranslate('Etudiant')
  // texteEntreprise.value = await translateStore.handleTranslate('Entreprise')
  // 'Etudiant'.value = await translateStore.handleTranslate("Etudiant")
  // text3.value = await translateStore.handleTranslate("Entreprise")
});
</script>

<template>
  <div class="wrapped">
    <h1 class="text-center main-color">{{text}}</h1>
    <n-card>
      <n-tabs type="line" size="large" animated justify-content="center">
        <n-tab-pane
          v-if="
            !store.state.user ||
            store.state.user.user.statut.statut === 'etudiant'
          "
          :name="defaulValueTranslate == 'fr' ? 'Etudiant' :'Student'"
          :tab="defaulValueTranslate == 'fr' ? 'Etudiant' :'Student'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Etudiant'"
          />
        </n-tab-pane>
        <n-tab-pane
          v-if="
            !store.state.user ||
            store.state.user.user.statut.statut === 'entreprise'
          "
          :name="defaulValueTranslate == 'fr' ? 'Entreprise' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Entreprise' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Entreprise'"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<style scoped>
@import "./style/index.css";
</style>
