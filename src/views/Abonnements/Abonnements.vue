<script setup>
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { ref, onMounted } from "vue";
import { useStore } from 'vuex';
// import LoadingSpinner from "../../Shared/Compoments/LoadingSpinner.vue";
import {useTranslateStore} from "../../store-pinia/Translate/useTranslateStore"
import { useEntreprisesStore } from "../../store-pinia/Entreprise/useEntreprisesStore";
// import {mapActions} from "pinia"
import instance from "../../api/api";

// import i18n from "../../plugins/i18n";
// import Swal from "sweetalert2";

import ContainerAbonnements from "./features/ContainerAbonnements.vue";
// const { t } = i18n.global;
const text0 = ref("")
const store = useStore();
const storeEntreprise = useEntreprisesStore();
const translateStore = useTranslateStore();
const defaulValueTranslate = ref(translateStore.defaultLocale);
console.log("defaulValueTranslate",defaulValueTranslate.value)
const abonnements = ref([]);
const loadingSpinner = useLoadingSpinner();

const handleAbonement = async () => {
  loadingSpinner.launchLoading(true);
  try {
    const response = await instance.get("getAbonnement");
    abonnements.value = response.data.data;
    console.log("RESPONSE_getAbonnement", response.data);
    loadingSpinner.launchLoading(false);
  } catch (error) {
    console.log(error);
    loadingSpinner.launchLoading(false);
  }
};

onMounted(async () => {
  await handleAbonement();
  if(JSON.parse(localStorage.getItem('@reference'))){
  try {
    const response = await instance.get("payStack/payment/callback/"+JSON.parse(localStorage.getItem('@reference')));
    console.log("responseVERIF",response)
    if(response.data.status){
      localStorage.removeItem('@reference')
      console.log("VERIFICATION TERMINER")
      await storeEntreprise.get_all_abonnement();
    }
  } catch (error) {
    console.log(error);
  }finally{
    await handleAbonement();
  }
  }
  text0.value = await translateStore.handleTranslate("Choisissez votre formule")
});
</script>

<template>
  <div class="wrapped">
    <h1 class="text-center main-color">{{text0}}</h1>
    <n-card>
       <div class="d-flex justify-content-center">
     <p class="w-50 p-3" style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
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
<!-- <LoadingSpinner /> -->
  </div>
</template>
<style scoped>
@import "./style/index.css";
</style>
