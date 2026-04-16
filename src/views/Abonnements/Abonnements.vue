<script setup>
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { ref, onMounted ,defineProps} from "vue";
import { useStore } from 'vuex'
import { useRouter,useRoute} from 'vue-router'
import {useTranslateStore} from "../../store-pinia/Translate/useTranslateStore"
// import { useEntreprisesStore } from "../../store-pinia/Entreprise/useEntreprisesStore";
// import axios from "axios";
import instance from "../../api/api";

// import i18n from "../../plugins/i18n";
import Swal from "sweetalert2";

import ContainerAbonnements from "./features/ContainerAbonnements.vue";
// const { t } = i18n.global;
const props = defineProps({
  ProfilAbonnement: {
    type: String,
    required: false,
    default: null
  },
})

const text0 = ref("")
const store = useStore();
const reference = ref(null);
const router = useRouter();
const route = useRoute();
// const storeEntreprise = useEntreprisesStore();
const translateStore = useTranslateStore();
const defaulValueTranslate = ref(translateStore.defaultLocale);

const abonnements = ref([]);
const loadingSpinner = useLoadingSpinner();

const handleAbonement = async () => {
  loadingSpinner.launchLoading(true);
  try {
    const response = await instance.get("getAbonnement");
    // console.log("response",response)
    abonnements.value = response.data.data;
    loadingSpinner.launchLoading(false);
  } catch (error) {
    console.log(error);
    loadingSpinner.launchLoading(false);
  }
};

async function doVerificationAbonnement(payload){
try {
    const response = await instance.get("payStack/payment/callback/"+payload); 
    if(response.data.status){
       Swal.fire({
              icon: "success",
              title: "Paiement reussi.",
              showConfirmButton: true,
            });
            router.push('/')
    }
    if(!response.data.status){
      Swal.fire({
              icon: "error",
              title: "Paiement échoué.",
              showConfirmButton: false,
              timer: 1500,
            });
    }
  } catch (error) {
    console.log(error);
  }finally{
    await handleAbonement();
  }
}

onMounted(async () => {
  text0.value = await translateStore.handleTranslate("Choisissez votre formule")
  reference.value = route.params.reference
  console.log("route.params.reference",route.params.reference)
    if(reference.value){
    doVerificationAbonnement(reference.value)
    } 
  await handleAbonement();
});
</script>

<template>
  <div class="wrapped myconteneur">
    <h1 class="text-center main-color">{{text0}}</h1>
    <!-- {{ abonnements.filter(item => 
  item.categorie.categorie.toLowerCase().includes('vétéran')
) }} -->
  <!-- {{ props.ProfilAbonnement }} -->
    {{ store.state.user.user }}
    <n-card>
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
      <n-tabs type="line" size="large" animated justify-content="center">

  <!-- Etudiant -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Etudiant'].includes(s.statut)) &&
        (props.ProfilAbonnement === 'Etudiant' || store.state.user?.user?.statut?.statut === 'Etudiant')
      )
    "
    :name="defaulValueTranslate === 'fr' ? 'Etudiant' : 'Student'"
    :tab="defaulValueTranslate === 'fr' ? 'Etudiant' : 'Student'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Etudiant"
    />
  </n-tab-pane>

  <!-- Entreprise -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Entreprise'].includes(s.statut)) &&
        (props.ProfilAbonnement === 'Entreprise' || store.state.user?.user?.statut?.statut === 'Entreprise')
      )
    "
    :name="'Entreprise'"
    :tab="'Entreprise'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Entreprise"
      :tabsSubAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        }))
      "
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
      "
    />
  </n-tab-pane>

  <!-- Particulier -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Particulier'].includes(s.statut)) &&
        (props.ProfilAbonnement === 'Particulier' || store.state.user?.user?.statut?.statut === 'Particulier')
      )
    "
    :name="defaulValueTranslate === 'fr' ? 'Particulier' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Particulier' : 'Company'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Particulier"
    />
  </n-tab-pane>

  <!-- Artisan -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Artisan'].includes(s.statut)) &&
        (props.ProfilAbonnement === 'Artisan' || store.state.user?.user?.statut?.statut === 'Artisan')
      )
    "
    :name="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Artisan"
      :tabsSubAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('artisan'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        }))
      "
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('artisan'))
      "
    />
  </n-tab-pane>

  <!-- Professionnel -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Professionnel'].includes(s.statut)) &&
        (props.ProfilAbonnement === 'Professionnel' || store.state.user?.user?.statut?.statut === 'Professionnel')
      )
    "
    :name="defaulValueTranslate === 'fr' ? 'Professionnel' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Professionnel' : 'Company'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Professionnel"
    />
  </n-tab-pane>

  <!-- Vétéran -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s =>
          ['Vétéran', 'veteran'].includes(s.statut)
        ) &&
        (props.ProfilAbonnement === 'veteran' || store.state.user?.user?.statut?.statut === 'veteran')
      )
    "
    :name="'Vétéran'"
    :tab="'Vétéran'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Vétéran"
      :tabsSubAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('vétéran'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        }))
      "
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('vétéran'))
      "
    />
  </n-tab-pane>

</n-tabs>
    </n-card>
  </div>
</template>
<style scoped>
@import "./style/index.css";

</style>
