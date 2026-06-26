<script setup>
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { ref, onMounted ,defineProps,computed } from "vue";
import { useStore } from 'vuex'
import { useRoute} from 'vue-router'
import {useTranslateStore} from "../../store-pinia/Translate/useTranslateStore"
import instance from "../../api/api";
// import Swal from "sweetalert2";
import ContainerAbonnements from "./features/ContainerAbonnements.vue";
const props = defineProps({
  ProfilAbonnement: {
    type: String,
    required: false,
    default: null
  },
  notUseIncludesForArtisan:{
  type:Boolean,
  required:false,
  default:false
  },
  statut_talent_choice:{
    type:String,
    required:false,
    default:null
  },
  statut_talent_artisan:{
    type:String,
     required:false,
    default:null
  },
  statut_entreprise:{
     type:String,
     required:false,
    default:null
  }
})

const text0 = ref("")
const activeTab = ref('')
const store = useStore();
const reference = ref(null);

const profileAbonnement = ref(null);

const route = useRoute();
const translateStore = useTranslateStore();
const defaulValueTranslate = ref(translateStore.defaultLocale);

const abonnements = ref([]);
const loadingSpinner = useLoadingSpinner();

const abonnementsArtisan = computed(() => {
  return (abonnements.value || [])
    .filter(item =>
      item?.categorie?.categorie?.toLowerCase().includes('artisan')
    )
    .map(item => ({
      label: item.categorie.categorie,
      id: item.categorie.categorie
    }))
})

const handleAbonement = async () => {
  loadingSpinner.launchLoading(true)
  try {
    const response = await instance.get("getAbonnement")
    abonnements.value = response.data.data || []
  } catch (error) {
    console.log(error)
  } finally {
    loadingSpinner.launchLoading(false)
  }
}
const entrepriseAbonnements = computed(() => {
  const abonnementsEntreprise = abonnements.value
    .filter(item =>
      item.categorie.categorie.toLowerCase().includes("entreprise")
    )
    .map(item => ({
      label: item.categorie.categorie,
      id: item.categorie.categorie,
    }));

  const statutEntreprise =
    props.statut_entreprise ??
    store.state.user?.statut_entreprise;

  if (store.state.user && statutEntreprise) {
    return abonnementsEntreprise.filter(
      item => item.id === `Entreprise ${statutEntreprise}`
    );
  }

  return abonnementsEntreprise;
});
// const entrepriseAbonnements = computed(() => {
//   const abonnementsEntreprise = abonnements.value
//     .filter(item =>
//       item.categorie.categorie.toLowerCase().includes("entreprise")
//     )
//     .map(item => ({
//       label: item.categorie.categorie,
//       id: `Entreprise ${item.categorie.categorie}`,
//     }));

//   if (
//     store.state.user &&
//     store.state?.user?.statut_entreprise
//   ) {
//     if(props.statut_entreprise){
//       return abonnementsEntreprise.filter(
//       item =>
//         item.id ===
//         `Entreprise ${props.statut_entreprise}`
//     );
//     }
//     return abonnementsEntreprise.filter(
//       item =>
//         item.id ===
//         `Entreprise ${store.state.user.statut_entreprise}`
//     );
//   }

//   return abonnementsEntreprise;
// });

onMounted(async () => {
  await store.dispatch("getInfoUser");
  
  text0.value = await translateStore.handleTranslate("Choisissez votre formule")

  reference.value = route.params.reference

  profileAbonnement.value = props.ProfilAbonnement
    ? props.ProfilAbonnement
    : store.state.user?.user?.statut?.statut


  activeTab.value = props.ProfilAbonnement
    ? props.ProfilAbonnement
    : store.state.user ? store.state.user?.user?.statut.statut:'Particulier'

    
  //  console.log('USERInfo',store.state.user?.user?.statut.statut)


  // 🔥 IMPORTANT : un seul appel API
  await handleAbonement()
  

})

</script>

<template>
  <!-- {{ props.ProfilAbonnement }}
  <p>abonnementssde:{{ abonnements }}</p> -->
  <div class="wrapped">
    <h1 class="text-center main-color" style="font-size: 1.5em;">{{text0}}</h1>
      <div v-if="props.ProfilAbonnement">
    <n-card v-if="abonnements.length">
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
      
      <n-tabs type="line" size="large" animated justify-content="center"
      v-model:value="activeTab"
      >
  <!-- Particulier -->
  <n-tab-pane
    v-if="
       profileAbonnement === 'Particulier'
    "
    :name="defaulValueTranslate === 'fr' ? 'Particulier' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Particulier' : 'Company'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Particulier"
    />
  </n-tab-pane>
  <!-- Etudiant -->
  <n-tab-pane
    v-if="
     profileAbonnement === 'Etudiant'
    "
    :name="defaulValueTranslate === 'fr' ? 'Etudiant' : 'Student'"
    :tab="defaulValueTranslate === 'fr' ? 'Etudiant' : 'Student'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Etudiant"
    />
  </n-tab-pane>
  <!-- Professionnel -->
  <n-tab-pane
    v-if="
     profileAbonnement === 'Professionnel'
    "
    :name="defaulValueTranslate === 'fr' ? 'Professionnel' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Professionnel' : 'Company'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Professionnel"
    />
  </n-tab-pane>
    <!-- Artisan -->
  <n-tab-pane
    v-if="
       profileAbonnement === 'Artisan'
    "
    :name="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
  >
  <!-- <p>store.state.user?.statut_talent:{{ store.state.user?.statut_talent }}</p>
<p>statut_talent_artisan:{{ statut_talent_artisan }}</p> -->
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Artisan"
      :tabsSubAbonnement="abonnementsArtisan"
      :notUseIncludesForArtisan="notUseIncludesForArtisan"
      :statut_talent_choice_artisan="statut_talent_artisan ? statut_talent_artisan : store.state.user?.statut_talent"
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('artisan'))
      "
    />
  </n-tab-pane>
 <!-- Vétéran -->
  <n-tab-pane
    v-if="
      profileAbonnement === 'Vétéran'
    "
    :name="'Vétéran'"
    :tab="'Vétéran'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Vétéran"
      :statut_talent_choice="statut_talent_choice"
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

  <!-- Entreprise -->
  <n-tab-pane
    v-if="
     profileAbonnement === 'Entreprise'
    "
    :name="'Entreprise'"
    :tab="'Entreprise'"
  >
  
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Entreprise"
      :tabsSubAbonnement="entrepriseAbonnements"
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
      "
    />
  </n-tab-pane>

 </n-tabs>
    </n-card>
    <p v-else class="shimmer-text" style="text-align: center;">Chargement...</p>
  </div>



      <div v-else>
     <n-card v-if="abonnements.length">
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
      <!-- <span>{{ store.state.user?.user?.statuses }}</span> -->
      <n-tabs type="line" size="large" animated justify-content="center"
      v-model:value="activeTab"
      >
      
  <!-- Particulier -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Particulier'].includes(s.statut)) 
        && profileAbonnement === 'Particulier'
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

  <!-- Etudiant -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Etudiant'].includes(s.statut)) 
        && profileAbonnement === 'Etudiant'
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
   <!-- Professionnel -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Professionnel'].includes(s.statut)) 
        && profileAbonnement === 'Professionnel'
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

  <!-- Artisan -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Artisan'].includes(s.statut)) 
        && profileAbonnement === 'Artisan'
      )
    "
    :name="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
    :tab="defaulValueTranslate === 'fr' ? 'Artisan' : 'Company'"
  >

    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Artisan"
      :notUseIncludesForArtisan="notUseIncludesForArtisan"
      :statut_talent_choice_artisan="statut_talent_artisan ? statut_talent_artisan : store.state.user?.statut_talent"
      :tabsSubAbonnement="abonnementsArtisan"
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('artisan'))
      "
    />
  </n-tab-pane>
  
  <!-- Vétéran -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s =>
          ['Vétéran', 'Vétéran'].includes(s.statut)
        ) && profileAbonnement === 'Vétéran'
      )
    "
    :name="'Vétéran'"
    :tab="'Vétéran'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Vétéran"
      :statut_talent_choice="store.state.user?.statut_talent"
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

  <!-- Entreprise -->
  <n-tab-pane
    v-if="
      !store.state.user ||
      (
        store.state.user?.user?.statuses.some(s => ['Entreprise'].includes(s.statut)) 
        && profileAbonnement === 'Entreprise'
      )
    "
    :name="'Entreprise'"
    :tab="'Entreprise'"
  >
    <ContainerAbonnements
      :abonnements="abonnements"
      type_abonnements="Entreprise"
      :statut_talent_choice_entreprise="store.state.user?.statut_entreprise"
      :tabsSubAbonnement="entrepriseAbonnements"
      :subAbonnement="abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
      "
    />
  </n-tab-pane>

 

</n-tabs>
    </n-card>
     <p v-else class="shimmer-text" style="text-align: center;">Chargement...</p>
      </div>
   
  </div>
</template>
<style scoped>
.wrapped{
  margin-top: 9em;
}
@media screen and (max-width:1200px) {
 .wrapped{
  margin-top: 6em;
}
}
@media screen and (max-width:900px) {
 .wrapped{
  margin-top: 6em;
}
}

@import "./style/index.css";

.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
