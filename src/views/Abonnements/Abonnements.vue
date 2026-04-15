<script setup>
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { ref, onMounted } from "vue";
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
  item.categorie.categorie.toLowerCase().includes('entreprise')
) }} -->
    <n-card>
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
      <n-tabs type="line" size="large" animated justify-content="center">
        <n-tab-pane
           v-if="
  !store.state.user ||
  (store.state.user?.user?.statuses || []).some(s =>
    ['etudiant', 'professionnel', 'artisan', 'veteran','particulier'].includes(s.statut)
  )
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
  (store.state.user?.user?.statuses || []).some(s =>
    ['entreprise'].includes(s.statut)
  )
"
          :name="defaulValueTranslate == 'fr' ? 'Entreprise' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Entreprise' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Entreprise'"
            :tabsSubAbonnement="abonnements.filter(item => 
  item.categorie.categorie.toLowerCase().includes('entreprise')
).map(item=>{
  return {label:item.categorie.categorie,id:item.categorie.categorie}
})"
  :subAbonnement="abonnements.filter(item => 
  item.categorie.categorie.toLowerCase().includes('entreprise')
 )"

          />
        </n-tab-pane>
           <n-tab-pane
          v-if="
  !store.state.user ||
  (store.state.user?.user?.statuses || []).some(s =>
    ['entreprise'].includes(s.statut)
  )
"
          :name="defaulValueTranslate == 'fr' ? 'Particulier' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Particulier' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Particulier'"
          />
        </n-tab-pane>
           <n-tab-pane
          v-if="
  !store.state.user ||
  (store.state.user?.user?.statuses || []).some(s =>
    ['entreprise'].includes(s.statut)
  )
"
          :name="defaulValueTranslate == 'fr' ? 'Artisans' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Artisans' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Artisans'"
          />
        </n-tab-pane>
           <n-tab-pane
          v-if="
  !store.state.user ||
  (store.state.user?.user?.statuses || []).some(s =>
    ['entreprise'].includes(s.statut)
  )
"
          :name="defaulValueTranslate == 'fr' ? 'Professionnel' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Professionnel' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Professionnel'"
          />
        </n-tab-pane>
           <n-tab-pane
          v-if="
  !store.state.user ||
  (store.state.user?.user?.statuses || []).some(s =>
    ['entreprise'].includes(s.statut)
  )
"
          :name="defaulValueTranslate == 'fr' ? 'Vétéran' :'Company'"
          :tab="defaulValueTranslate == 'fr' ? 'Vétéran' :'Company'"
        >
          <ContainerAbonnements
            :abonnements="abonnements"
            :type_abonnements="'Vétéran'"
          />
        </n-tab-pane>
          
      </n-tabs>
    </n-card>
  </div>
</template>
<style scoped>
@import "./style/index.css";

</style>
