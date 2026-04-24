<script>
import instance from '../../../../../api/api';
import FieldsVeteran from '../FieldsForEachProfil/FieldsVeteran.vue'
import FieldsArtisan from '../FieldsForEachProfil/FieldsArtisan.vue';
import FieldsProfessionnel from '../FieldsForEachProfil/FieldsProfessionnel.vue'
import FieldsCompany from '../FieldsForEachProfil/FieldsCompany.vue';
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
import AddProfilHybride from './AddProflHybride.vue';
import Swal from 'sweetalert2';
import { useLoadingSpinner } from '../../../../../store-pinia/LoadingSpinner/useLoadingSpinner';
export default {
  name: 'InfoStatusesUser',
  components:{FieldsVeteran,
    FieldsArtisan,FieldsProfessionnel,
    FieldsCompany,AddProfilHybride},
  props: {
    profils: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      choiceProfilHybrideForAdd:[],
      allProfilsHybrides:[],
      profilhybrideUserConnected:[],
      showModalChangeProfilOfBase: false,
      showModalAbonnements:false,
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
  Etudiant:"Ce profil vous permet d'accéder à des offres d'emploi,ainsi que de bénéficier de tarifs préférentiels sur nos services.",
  Artisan:"Ce profil vous permet de mettre en avant votre savoir-faire artisanal, d'accéder à des offres d'emploi spécifiques et de bénéficier de tarifs préférentiels sur nos services.",
  Particulier:"Ce profil vous permet de rechercher des personnes à contacter tel que les artisans,etudiants et professionnels.",
  Professionnel:"Ce profil vous permet d'accéder à des offres d'emploi, de mettre en avant votre expérience professionnelle et de bénéficier de tarifs préférentiels sur nos services.",
  Vétéran:"Ce profil vous permet de mettre en avant votre expérience et vos compétences acquises au cours de votre carrière, d'accéder à des offres d'emploi spécifiques et de bénéficier de tarifs préférentiels sur nos services.",
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
        console.log("newValue",newValue.statut)
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
  console.log('Mode actif:', checked);
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
        console.log("responsehandleModeChange", response)

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
      console.log('profil',this.profils?.mode_discret)
      this.modeActif = this.profils?.mode_discret == 1 ? true:false;
      console.log('mode disd pas accpete')
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

      console.log("isChangeProfil",abonnementsStore?.isChangeProfil)
    },
    addIdOfProfilBase(payload) {
      const abonnementsStore = useAbonnementsStore()

       abonnementsStore.handleMyStatutOfBase(payload)

      console.log("statutOfBase",abonnementsStore?.statutOfBase)
    },
    openVerification(userStatut) {
      this.$emit('open-verification', userStatut);
    },
    handleStatutProfil(e){
    
       console.log('VALUE selectedStatus',e.target.value)
       this.selectedParseStatus = JSON.parse(e.target.value)
       
       this.addIdOfProfilBase(this.selectedParseStatus.id)
       this.optionsAnswer = null;
       this.profilHybride=[];
       console.log('this.selectedParseStatus',this.selectedParseStatus)
      },
      resetProfilHybrideData(){
        const abonnementsStore = useAbonnementsStore()
         abonnementsStore.handleHybrideAddProfil([])
         console.log('addProfilHybride',abonnementsStore?.addProfilHybride)
      },
    resetData(){
      console.log("reset data")
this.optionsAnswer=null;
this.selectedStatus="";
this.profilHybride=[];
this.allStatuses=[];
this.selectedParseStatus = ""
    },
    resetDataModeDiscret(){
      console.log("this.profils?.mode_discret",this.profils?.mode_discret)
      if(this.profils?.mode_discret == 1){
     this.modeActif = true
      }else{
        this.modeActif = false
      }
    },
     async lister_statut() {
  const user = this.$store.state.infoUserConnected?.user;
  const statutUser = user?.statut.statut;

  const transitions = {
    Etudiant: ['Professionnel', 'Artisan'],
    Professionnel: ['Artisan', 'Vétéran'],
    Artisan: ['Professionnel','Vétéran'],
    Vétéran: ['Particulier','Artisan'],
    Particulier: ['Entreprise'],
    Entreprise:['Entreprise']
  };

  const allowed = transitions[statutUser]
  console.log("allowed",allowed)

  try {
    const response = await instance.get("listStatut");

    this.allStatuses = response.data.data.filter(item =>
      allowed.includes(item.statut)
    );
    this.allProfilsHybrides = response.data.data.filter(item =>item.statut === 'Particulier' || item.statut === 'Artisan');
    this.profilhybrideUserConnected = this.profils.user?.statuses.filter(item => item.statut !==  this.profils.user?.statut?.statut); 
    console.log("allStatuses2", {
      statut: this.allStatuses,
      profil: this.$store.state.infoUserConnected.user.statut
    });
    console.log("allProfilsHybrides", this.allProfilsHybrides);

  } catch (error) {
    console.log(error);
  }
},
  },
  async created() {
    await this.lister_statut();
    console.log("USERPROFIL",this.profils)
    this.resetDataModeDiscret();
  },
}
</script>

<template>
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
 <div v-if="selectedParseStatus && ['Particulier', 'Vétéran','Etudiant'].includes(selectedParseStatus.statut)">
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
  <div v-if="optionsAnswer === 'oui' && ['Particulier', 'Vétéran',''].includes(selectedParseStatus.statut)">
    <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
     Profils disponibles
    </label>
    <div class="round-container" v-if="selectedParseStatus.statut !== 'Entreprise'">
      <label 
        v-for="item in allStatuses.filter(item=>item.statut !== selectedParseStatus.statut)" 
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
  :optionsAnswer="optionsAnswer"
  />
  </div>
    </section>
      <section v-else style="text-align: center;" class="shimmer-text">
        Chargement des profils....
      </section>
      
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
      <!-- {{ profils.user?.statuses}} -->
        <div style="display: flex; gap:1em;flex-wrap: wrap;">
<button
      v-if="profils?.user?.statuses.some(item=>item.statut != 'Vétéran')"
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 5%;
            padding:0.3em;
          "
          @click="async()=>{
            loadActiveChangedProfil(true);
            showModalChangeProfilOfBase = !showModalChangeProfilOfBase
             await this.lister_statut();
             
          }"
        >
          Changer le profil de base
        </button>
        <!-- {{ profils?.user?.statuses }} -->
        <div>
      <button
      v-if="profils?.user?.statuses.some(item=>item.statut != 'Vétéran' && (item.statut != 'Particulier' || item.statut != 'Artisan'))"
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 5%;
            padding:0.3em;
          "
          @click="async()=>{
            loadActiveChangedProfil(true);
            showModalAddProfilHybride = !showModalAddProfilHybride
             await this.lister_statut();
             
          }"
        >
          Ajouter un profil hybride
        </button>
        </div>
       
        </div>
      
    </div>
     <!-- <p>{{ profils?.user?.abonement }}</p> -->
     <div style="padding:0 1em;" v-if="profils?.user?.abonement?.some(item=>item.statut == 'success' && item.abonement.libelle === 'BROBROLI+')">
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
            height: 200px;
            min-height: 100%;
            margin: 1em;
            width: 300px;
            ">
          <h3 style="color: white;">{{ profil.statut }}</h3>
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