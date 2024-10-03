<script setup>
import { ref, onMounted } from "vue";

import instance from "../../api/api";

import i18n from "../../plugins/i18n";

import ContainerAbonnements from "./features/ContainerAbonnements.vue";
const { t } = i18n.global;

const abonnements = ref([]);

const isLoading = ref(true);

const handleAbonement = async () => {
  try {
    const response = await instance.get("getAbonnement");
    abonnements.value = response.data.data;
    console.log("RESPONSE_getAbonnement", response.data);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
};

const verifIfAbonnementIsSuccess = async () => {
  const TRANSACTION_ID = localStorage.getItem("transaction_id");
  if (TRANSACTION_ID) {
    try {
      const response = await instance.post(
        "cintepay/verification_paiement/" + TRANSACTION_ID
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("transaction_id");
  }
};

onMounted(async () => {
  await verifIfAbonnementIsSuccess();
  await handleAbonement();
});
</script>

<template>
  <div class="wrapped">
    <h1 class="text-center main-color">Choisissez votre formule</h1>
    <n-card>
      <n-tabs type="line" size="large" animated justify-content="center">
        <n-tab-pane name="Etudiant" tab="Etudiant">
          <h1 v-if="isLoading">{{ t("spinnerText") }}</h1>
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Etudiant'"
          />
        </n-tab-pane>
        <n-tab-pane name="Entreprise" tab="Entreprise">
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
