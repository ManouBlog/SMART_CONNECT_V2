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
  }
})

const text0 = ref("")
const activeTab = ref('')
const store = useStore();
const reference = ref(null);

const profileAbonnement = ref(null);
// const router = useRouter();
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

onMounted(async () => {
  store.dispatch("getInfoUser");
  console.log("props.ProfilAbonnement", props.ProfilAbonnement)
  text0.value = await translateStore.handleTranslate("Choisissez votre formule")

  reference.value = route.params.reference

  profileAbonnement.value = props.ProfilAbonnement
    ? props.ProfilAbonnement
    : store.state.user?.user?.statut?.statut
    console.log("profileAbonnement.value", profileAbonnement.value)

  activeTab.value = props.ProfilAbonnement
    ? props.ProfilAbonnement
    : store.state.user ? store.state.user?.user?.statut.statut:'Etudiant'

    console.log("activeTab.value", activeTab.value)
   console.log('USERInfo',store.state.user?.user?.statut.statut)
  // if (reference.value) {
  //   await doVerificationAbonnement(reference.value)
  // }

  // 🔥 IMPORTANT : un seul appel API
  await handleAbonement()
  
  console.log("abonnements chargés", abonnements.value)
  console.log("artisan ready", abonnementsArtisan.value)
})

</script>

<template>
  <div class="wrapped myconteneur">
    <h1 class="text-center main-color" style="font-size: 1.5em;">{{text0}}</h1>
      <div v-if="props.ProfilAbonnement">
       
        <!-- {{ profileAbonnement }}
        {{ store.state.user?.user?.statuses }} -->
         <!-- <p>statut_talent_choice:{{ statut_talent_choice }}</p> -->

    <n-card>
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>

     
    
      </div>
      
      <n-tabs type="line" size="large" animated justify-content="center"
      v-model:value="activeTab"
      >

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
      :tabsSubAbonnement="store.state.user ? abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        })).filter(item=>item.id === 'Entreprise '+store.state?.user?.statut_entreprise)
        :abonnements
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

</n-tabs>
    </n-card>
      </div>
      <div v-else>
<!-- <p>
          PEORJF:{{ abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        })).filter(item=>item.id === 'Entreprise '+store.state?.user?.statut_entreprise) }}
        </p>
        <p>store.state.user?.user?:{{ store.state?.user?.statut_entreprise }}</p> -->
<n-card>
       <div class="d-flex justify-content-center">
     <p style="background:#df3535;color:white;">
      Tout abonnement existant sera automatiquement remplacé par votre nouveau choix
     </p>
      </div>
      <!-- <span>{{ store.state.user?.user?.statuses }}</span> -->
      <n-tabs type="line" size="large" animated justify-content="center"
      v-model:value="activeTab"
      >

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
      :tabsSubAbonnement="store.state.user ? abonnements
        .filter(item => item.categorie.categorie.toLowerCase().includes('entreprise'))
        .map(item => ({
          label: item.categorie.categorie,
          id: item.categorie.categorie
        })).filter(item=>item.id === 'Entreprise '+store.state?.user?.statut_entreprise)
        :abonnements
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

</n-tabs>
    </n-card>
      </div>
   
  </div>
</template>
<style scoped>
@import "./style/index.css";
.myconteneur {
  margin-top: 8em;
}

@media (max-width: 980px) {
  .myconteneur {
    margin-top: 1em;
  }
}

</style>
