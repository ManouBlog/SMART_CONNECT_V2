<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import Header from "@/components/header";
import FooterView from "@/components/footer";
// import Banniere from "../Banner/Banniere.vue";
import LoadingSpinner from "../Shared/Compoments/LoadingSpinner.vue";
import Connexion from "./Connexion/Connexion.vue";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
import { useListeFavoris } from "../store-pinia/ListeFavoris/useListeFavoris";
// import { useVerificationStore } from "../store-pinia/Verification/useVerificationStore";
// import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { storeToRefs } from "pinia";

const store = useStore();

// Stores
const registerStore = useRegisterStore();
const loadingSpinnerStore = useLoadingSpinner();
// const translateStore = useTranslateStore();
// const verificationStore = useVerificationStore();
const listeFavorisStore = useListeFavoris();

// State from stores
const { isModal } = storeToRefs(registerStore);
const { isLoadingVisible } = storeToRefs(loadingSpinnerStore);
// const { defaultLocale } = storeToRefs(translateStore);

// Local state
const dateActive = ref(null);

// Methods
// const toogleModal = () => registerStore.changeValueIsModal();
// const verifIfAbonementIsExpied = () => verificationStore.verifIfAbonementIsExpied();
const handleListeFavoris = (token) => listeFavorisStore.handleListeFavoris(token);

const getDateAbonementActive = () => {
  if (useStore().state.user && useStore().state.user.user.abonement) {
    useStore().state.user.user.abonement.forEach((item) => {
      if (item.statut === "success") {
        dateActive.value = item.echeance;
      }
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  localStorage.setItem("translate", "fr");
  handleListeFavoris(store.state.token);
  getDateAbonementActive();
  store.dispatch("handleListeFavoris");
});

// Note: Vous devrez probablement importer/accéder à votre store Vuex global différemment
// J'ai utilisé useStore() comme placeholder - à remplacer par votre implémentation réelle
</script>
<template>
  <div class="home position-relative">
    <div v-if="isLoadingVisible">
      <LoadingSpinner />
    </div>
    <Connexion v-if="isModal" />
    <Header />
    <!-- <div style="margin:5em 0;">
    </div> -->
    <!-- <Banniere /> -->
    <router-view />
    <FooterView />
  </div>
</template>
