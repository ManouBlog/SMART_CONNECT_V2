<script>
import instance from '../../../../../api/api';
import FieldsVeteran from '../FieldsForEachProfil/FieldsVeteran.vue'
import FieldsArtisan from '../FieldsForEachProfil/FieldsArtisan.vue';
import FieldsProfessionnel from '../FieldsForEachProfil/FieldsProfessionnel.vue'
import FieldsCompany from '../FieldsForEachProfil/FieldsCompany.vue';
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
import AddProfilHybride from './AddProflHybride.vue';
import Swal from 'sweetalert2';
import DeleteProfilHybride from './DeleteProfilHybride.vue';
import { useLoadingSpinner } from '../../../../../store-pinia/LoadingSpinner/useLoadingSpinner';
export default {
  name: 'InfoStatusesUser',
  components:{FieldsVeteran,
    FieldsArtisan,FieldsProfessionnel,
    FieldsCompany,AddProfilHybride,DeleteProfilHybride},
  props: {
    profils: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showModalDeleteMyProfilHybride:false,
      choiceProfilHybrideForAdd:[],
      allProfilsHybrides:[],
      profilhybrideUserConnected:[],
      showModalChangeProfilOfBase: false,
      showModalAbonnements:false,
      isLoading:true,
      selectedParseStatus:"",
      modeActif:false,
 showModalAddProfilHybride:false,
 allProfilHybrideAnswer: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
],
optionsAnswer:null,
selectedStatus:"",
profilHybride:[],
allStatuses:[],
descriptionProfil:{
  Etudiant:"Tu as les compétences. Nous avons les clients. Postule aux missions disponibles partout en CI . Tu es payé sur le digital dès la première mission validée. Zéro agence. Zéro intermédiaire.",
  Artisan:"Ton métier mérite des clients sérieux. Publie tes compétences, reçois des missions partout. Tu arrives. C'est fait. Le client paye.",
  Particulier:"Trouvez un prestataire vérifié par d'autres particuliers. Paiement digital uniquement si le travail est fait. Zéro risque",
  Professionnel:"Votre expertise mérite d'être trouvée par les bonnes entreprises. Accédez aux mandats disponibles partout en CI, candidatez directement et recevez votre paiement digitalisé après chaque mission.",
  Vétéran:"Votre parcours est rare. Les organisations qui cherchent une expertise comme la vôtre sont sur MonBrobroli. Accédez aux mandats stratégiques, entrez en contact direct avec les décideurs et recevez votre paiement après chaque mandat. Votre expérience a enfin la plateforme qu'elle mérite.",
}
    }
  },
 watch: {
  optionsAnswer: {
      handler(newValue) {
        if (newValue === 'non') {
          this.profilHybride = [];
          return;
        }
      },
      immediate: true
    },
    selectedStatus: {
      handler(newValue) {
      
        if (newValue.statut === 'Artisan') {
          this.optionsAnswer = null
          this.profilHybride = [];
          return;
        }
      },
      immediate: true
    },
    showModalChangeProfilOfBase:{
       handler(newValue) {
        
        if (!newValue) {
         this.loadActiveChangedProfil(false)
         this.addIdOfProfilBase(null)
          return;
        }
      },
      immediate: true
    }
  },
  methods: {
    async getInfoUser() {
      await this.$store.dispatch("getInfoUser");
    },
     async handleModeChange(checked) {
  // console.log('Mode actif:', checked);
  const loadingSpinner = useLoadingSpinner()

  Swal.fire({
    icon: 'warning',
    title: checked
      ? 'En activant ce mode, les entreprises ne pourront pas voir votre profil. Voulez-vous continuer ?'
      : 'En désactivant ce mode, les entreprises pourront voir votre profil. Voulez-vous continuer ?',
    confirmButtonText: 'Oui, valider',
    showCancelButton: true,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#f39c12',
    cancelButtonColor: '#e74c3c',
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadingSpinner.launchLoading(true);

      const data = {
        mode_discret: checked,
      }

      try {
        const response = await instance.post('mode-discret', data)
       

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            icon: 'info',
            title: response.data.message,
            confirmButtonText: 'OK',
          });
          this.modeActif = response.data.mode_discret
        }
      } catch (error) {
        console.log(error)
      } finally {
        loadingSpinner.launchLoading(false);
      }
    }else{
       loadingSpinner.launchLoading(true);
      try{
       await this.getInfoUser()
      
      this.modeActif = this.profils?.mode_discret == 1 ? true:false;
      
      }catch(error){
        console.log(error)
      }finally{
        loadingSpinner.launchLoading(false);
      }
      
    }
  });
},
    loadActiveChangedProfil(payload) {
      const abonnementsStore = useAbonnementsStore()

       abonnementsStore.handleChangeProfil(payload)

    
    },
    addIdOfProfilBase(payload) {
      const abonnementsStore = useAbonnementsStore()

       abonnementsStore.handleMyStatutOfBase(payload)

    },
    handleStatutProfil(e){
    
    
       this.selectedParseStatus = JSON.parse(e.target.value)
       
       this.addIdOfProfilBase(this.selectedParseStatus.id)
       this.optionsAnswer = null;
       this.profilHybride=[];
      
      },
      resetProfilHybrideData(){
        const abonnementsStore = useAbonnementsStore()
         abonnementsStore.handleHybrideAddProfil([])
     
      },
    resetData(){
    
this.optionsAnswer=null;
this.selectedStatus="";
this.profilHybride=[];
this.allStatuses=[];
this.selectedParseStatus = ""
    },
    resetDataModeDiscret(){
      
      if(this.profils?.mode_discret == 1){
     this.modeActif = true
      }else{
        this.modeActif = false
      }
    },
    cleanProfilHybride(){
       const STOREABONNEMENT = useAbonnementsStore()
            STOREABONNEMENT.handleChangeInfoForAbonnement({profilHybride:[]})
            STOREABONNEMENT.handleChangeProfil(false)
    },
     async lister_statut() {
  const user = this.$store.state.infoUserConnected?.user;
  const statutUser = user?.statut.statut;

  const transitions = {
    Etudiant: ['Professionnel', 'Artisan'],
    Professionnel: ['Artisan', 'Vétéran'],
    Artisan: ['Professionnel','Vétéran'],
    Vétéran: ['Particulier','Artisan'],
    Particulier: [],
    Entreprise:['Entreprise']
  };

  const allowed = transitions[statutUser]
  

  try {
    const response = await instance.get("listStatut");

    this.allStatuses = response.data.data.filter(item =>
      allowed.includes(item.statut)
    );
    this.allProfilsHybrides = response.data.data.filter(item =>item.statut === 'Particulier' || item.statut === 'Artisan');
    this.profilhybrideUserConnected = this.profils.user?.statuses.filter(item => item.statut !==  this.profils.user?.statut?.statut); 


  } catch (error) {
    console.log(error);
  }finally{
    this.isLoading = false
  }
},

  },
  async created() {
    await this.lister_statut();
  
    this.resetDataModeDiscret();
  },
}
</script>

<template>

   <n-modal v-model:show="showModalDeleteMyProfilHybride" 
       style="width:80%; height: 400px; 
    overflow-y: auto; 
    max-height: 80vh;" 
       preset="card" 
       :closable="false"
       >
      <template #header>
        <div class="modal-header">
          <h3>Supprimer un profil hybride</h3>
        </div>
      </template>
      
      <DeleteProfilHybride 
      />
      
    </n-modal>
  <n-modal v-model:show="showModalAddProfilHybride" 
       style="width:80%; height: 400px; 
    overflow-y: auto; 
    max-height: 80vh;" 
       preset="card" 
       :closable="false"
      @after-leave="resetProfilHybrideData"
       >
      <template #header>
        <div class="modal-header">
          <h3>Ajouter un profil hybride</h3>
        </div>
      </template>
      
      <AddProfilHybride 
      :ProfilsUser="profils"
      />
      
    </n-modal>
     
       <n-modal v-model:show="showModalChangeProfilOfBase" 
       style="width:80%; height: 400px; 
    overflow-y: auto; 
    max-height: 80vh;" 
       preset="card" 
       :closable="false"
      @after-leave="resetData"
       >
      <template #header>
        <div class="modal-header">
          <h3>Changer le profil de base </h3>
        </div>
      </template>

      <div v-if="!isLoading">
<section v-if="allStatuses.length">
        <div class="w-100 mb-4">
            <label for="statusSelect">Séléctionnez un profil</label>
            <select 
      name="status" 
      id="statusSelect"
      v-model="selectedStatus"
      class="form-select rounded-4 shadow-sm border-0 w-100"
      style="min-height: 50px"
      :disabled="!allStatuses.length"
      @change="handleStatutProfil"
      required
    >
      <!-- Option placeholder -->
      <option value="" disabled selected>
        {{ allStatuses.length ? 'Sélectionnez un profil...' : 'Aucun profil disponible' }}
      </option>
      
      <!-- Options dynamiques -->
      <option 
        v-for="value in allStatuses" 
        :key="value.id" 
        :value="JSON.stringify(value)"
      >
        {{ value.statut }}
      </option>
           </select>
        </div>
        <!-- {{ selectedParseStatus }} -->
  <transition name="fade-slide">
 <div v-if="selectedParseStatus && ['Particulier', 'Vétéran','Etudiant','Professionnel'].includes(selectedParseStatus.statut)">
  <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
    Souhaitez-vous adopter un profil hybride ?
  </label>

  <div class="round-container">
    <label 
      v-for="item in allProfilHybrideAnswer" 
      :key="item.value"
      class="round-item"
    >
      <input
        type="radio"
        name="profilHybride"
        :value="item.value"
        v-model="optionsAnswer"
      />
      <span class="round-label">
        {{ item.label }}
      </span>
    </label>
  </div>
</div>
</transition>
   <transition name="fade-slide">
  <div v-if="optionsAnswer === 'oui' && ['Particulier', 'Vétéran','Professionnel'].includes(selectedParseStatus.statut)">
    <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
     Profils disponibles
    </label>
    <div class="round-container">
      <label 
        v-for="item in allProfilsHybrides" 
        :key="item.id"
        class="round-item"
      >
        <input
          type="checkbox"
          :value="item"
          v-model="profilHybride"
        />
        <span class="round-label">
          {{ item.statut }}
        </span>
      </label>
    </div>
  </div>
</transition>
  <div v-if="optionsAnswer || selectedParseStatus">
  <FieldsVeteran 
  :profilHybride="profilHybride"
  :optionsAnswer="optionsAnswer"
  :profilOfAbonnement="selectedParseStatus"
   v-if="selectedParseStatus.statut === 'Vétéran'"/>
  <FieldsArtisan 
  :profilOfAbonnement="selectedParseStatus"
  v-if="selectedParseStatus.statut === 'Artisan'" />
  <FieldsProfessionnel 
  :profilHybride="profilHybride"
  :optionsAnswer="optionsAnswer"
  :profilOfAbonnement="selectedParseStatus"
  v-if="selectedParseStatus.statut === 'Professionnel'" />
  <FieldsCompany 
  v-if="selectedParseStatus.statut === 'Entreprise'"
  :profilOfAbonnement="selectedParseStatus"
  />
  </div>
    </section>
      <section v-else style="text-align: center;">
        Pas de profils hybrides disponibles.
      </section>
      </div>
      <div v-else style="text-align: center;" class="shimmer-text">
      Chargement...
      </div>
    </n-modal>
  <a-card 
    style="
      width: auto;
      color: var(--third-color) !important;
      background: var(--secondary-color) !important;
    "
  >
    <!-- Header avec tes couleurs -->
    <div class="info-header d-flex justify-content-between align-items-center p-4 mb-5 flex-wrap">
      <h1 class="fw-bold my-3 mb-0" style="color: orange">Mes Profils</h1>
    
         <div>
    <a-dropdown>
    <template #overlay>
      <a-menu>
        <!-- Sous‑menu 1 : Changer le profil de base -->
        <a-menu-item
          v-if="profils?.user?.statut?.statut !== 'Vétéran' || profils?.user?.statut?.statut !== 'Particulier'"
          @click="async () => {
            loadActiveChangedProfil(true);
            showModalChangeProfilOfBase = !showModalChangeProfilOfBase;
            await this.lister_statut();
          }"
        >
          <span>Changer le profil de base</span>
        </a-menu-item>

        <!-- Sous‑menu 2 : Ajouter un profil hybride -->
        <a-menu-item
         v-if="profils?.user?.statuses.some(item=> item.statut != 'Particulier' || item.statut != 'Artisan')"
          @click="async () => {
            this.cleanProfilHybride();
            showModalAddProfilHybride = !showModalAddProfilHybride;
            await this.lister_statut();
          }"
        >
          <span>Ajouter un profil hybride</span>
        </a-menu-item>
        <!-- Sous‑menu 2 : supprimer un profil hybride -->
        <a-menu-item
         v-if="profils?.user?.statuses.some(item=> item.statut != 'Particulier' || item.statut != 'Artisan')"
          @click="async () => {
            showModalDeleteMyProfilHybride = !showModalDeleteMyProfilHybride;
          }"
        >
          <span>Supprimer un profil hybride</span>
        </a-menu-item>
      </a-menu>
    </template>

    <!-- Bouton avec les 3 points (sprite/icone) -->
    <a-button
      type="link"
      style="
        height: auto;
        padding: 0.3em;
        font-size: 1.2em;
        line-height: 1
      "
    >
      ⋮⋮⋮
    </a-button>
  </a-dropdown>
</div>
      
    </div>
     <div style="padding:0 1em;" 
     v-if="profils?.user?.abonement?.some(item=>item.statut == 'success' && item.abonement.libelle === 'BROBROLI+')
     &&  profils?.user.statut.statut == 'Professionnel'
     ">
       <label class="ant-form-item-label" style="display:flex;flex-direction: column;">
      <span style="font-size:1em;">Mode Discret</span>
    </label>
         <a-switch
    v-model:checked="modeActif"
    checked-children="Actif"
    un-checked-children="Inactif"
    @change="handleModeChange"
     size="default" 
    class="switch-green"
  />
      </div>

    <!-- Grille profils responsive -->
    <div class="p-4">
      <div v-if="profils?.user?.statuses.length === 0" class="text-center py-5 opacity-50">
        <i class="bi bi-people display-4 mb-3" style="color: var(--third-color)"></i>
        <h5>Aucun profil</h5>
      </div>
      
      <div
  v-else
  :style="{
    display: 'flex',
    gap: '1em',
    width: '100%',
    flexWrap: 'wrap',
    placeContent: profils?.user?.statuses?.length > 1 ? 'center' : 'flex-start',
  }"
>

            <div 
            v-for="(profil, index) in profils?.user?.statuses" :key="index"
            style="
            border: 3px solid white;
            background-color: #ffa500c2;
            padding:1em;
            border-radius: 10px;
            position: relative;
            min-height: 100%;
            margin: 1em;
            width: 300px;
            ">
          <h3 style="color: white;">{{ profil.statut }}</h3>
          <p v-if="profils?.statut_talent && profils?.user?.statut?.statut.includes('Vétéran') ">({{ profils?.statut_talent }})</p>
                    <p v-if="profils?.statut_talent && profils?.user?.statut?.statut.includes('Artisan') ">({{ profils?.statut_talent }})</p>
          <span 
          v-if="profils?.user?.statut?.statut == profil.statut"
          class="badge" 
          style="position: absolute;top:0.3em;right:0;font-size: 0.8em;background-color: #25535f;font-weight: bold;">
           Profil de base</span>
          <span>{{ descriptionProfil[profil.statut] }}</span>
          </div>
          
      </div>
    </div>
  </a-card>
</template>

<style scoped>

:deep(.ant-dropdown-trigger){
background-color: #f8f8f8;
padding: 0.5em !important;
box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.218);
}


.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #080808 0%,
    #fff 50%,
    #2e2e2e 100%
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
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

.card {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
</style>