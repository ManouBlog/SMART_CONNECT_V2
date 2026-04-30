<script>
import instance from '../../../../../api/api';
import FieldsCompany from '../FieldsForEachProfil/FieldsCompany.vue';
import AddProflHybride from './AddProflHybride.vue';
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
export default {
  name: 'InfoStatusesEntreprise',
  components:{FieldsCompany,AddProflHybride},
  props: {
    profils: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showModalBadgeVerifi: false,
      showModalAbonnements:false,
      selectedParseStatus:"",
      showModalAddProfilHybride:false,
// allStatutsCompany:[{ value: "Artisan", label: "Artisan" }],
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
  Particulier:"Ce profil vous permet de contacter les Artisans",
  Professionnel:"Ce profil vous permet d'accéder à des offres d'emploi, de mettre en avant votre expérience professionnelle et de bénéficier de tarifs préférentiels sur nos services.",
  Vétéran:"Ce profil vous permet de mettre en avant votre expérience et vos compétences acquises au cours de votre carrière, d'accéder à des offres d'emploi spécifiques et de bénéficier de tarifs préférentiels sur nos services.",
  Entreprise:"Ce profil vous permet de mettre en avant votre entreprise, d'accéder à des Talents (Etudiants, Professionnels,Artisans,Vétérans) et de bénéficier de tarifs préférentiels sur nos services."
}
    }
  },
 watch: {
  optionsAnswer: {
      handler(newValue) {
        if (newValue === 'non') {
          // const STORE_ABONNEMENT = useAbonnementsStore();
          this.profilHybride = [];
          // STORE_ABONNEMENT.handleChangeInfoForAbonnement();
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
          // this.allStatuses = []
          return;
        }
      },
      immediate: true
    },
    showModalBadgeVerifi:{
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
       console.log('this.selectedParseStatus',this.selectedParseStatus)
      },
    resetData(){
      console.log("reset data")
this.optionsAnswer=null;
this.selectedStatus="";
this.profilHybride=[];
this.allStatuses=[];
this.selectedParseStatus = ""
    },
     async lister_statut() {
  const user = this.$store.state.infoUserConnected?.user;
  const statutUser = user?.statut.statut;

  const transitions = {
    Entreprise:['Entreprise']
  };

  const allowed = transitions[statutUser]
  console.log("allowed",allowed)

  try {
    const response = await instance.get("listStatut");

    this.allStatuses = response.data.data.filter(item =>
      allowed.includes(item.statut)
    );
//    this.handleStatutProfil(JSON.stringify(this.allStatuses[0]))
   this.selectedParseStatus = this.allStatuses[0]
       this.addIdOfProfilBase(this.selectedParseStatus.id)
    console.log("allStatuses2", {
      statut: this.allStatuses,
      selectedParseStatus:this.selectedParseStatus,
      profil: this.$store.state.infoUserConnected.user.statut
    });

  } catch (error) {
    console.log(error);
  }
},
  },
  async created() {
    await this.lister_statut();
    
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
       >
      <template #header>
        <div class="modal-header">
          <h3>Ajouter un profil hybride</h3>
        </div>
      </template>
      
      <AddProflHybride 
      :ProfilsUser="this.$store.state.infoUserConnected"
      />
      
    </n-modal>
     
       <n-modal v-model:show="showModalBadgeVerifi" 
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
      
      <section v-if="allStatuses.length"
  
>
     
  
  <div>
  <FieldsCompany
  :profilOfAbonnement="selectedParseStatus"
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
    <div class="info-header d-flex justify-content-between align-items-center p-4 mb-5">
      <h1 class="fw-bold my-3 mb-0" style="color: orange">Mes Profils</h1>
      <!-- {{ profils.statut_entreprise }} -->
        <div>
  <button
      v-if="profils.statut_entreprise === 'Informelle'"
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 5%;
            padding:0.5em;
          "
          @click="async()=>{
            loadActiveChangedProfil(true);
            showModalBadgeVerifi = !showModalBadgeVerifi
             await this.lister_statut();
             
          }"
        >
          Changer le profil de base
        </button>
      <button
      v-if="profils.statut_entreprise === 'Informelle'"
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 5%;
            padding:0.5em;
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

    <!-- Grille profils responsive -->
    <div class="p-4">
      <div v-if="profils?.user?.statuses.length === 0" class="text-center py-5 opacity-50">
        <i class="bi bi-people display-4 mb-3" style="color: var(--third-color)"></i>
        <h5>Aucun profil</h5>
      </div>
      
     <div v-else 
     :style="{
       display: 'flex', 
       gap: '1em',
       width: '100%',
       flexWrap: 'wrap',
       placeContent: profils?.user?.statuses.length == 1 ? 'flex-start' : 'center'
     }">

            <div 
            v-for="(profil, index) in profils?.user?.statuses" :key="index"
            style="
            border: 3px solid white;
            background-color: #ffa500c2;
            padding:1em;
            border-radius: 10px;
            position: relative;
            height: 250px;
            margin: 1em;
            width: 300px;
            ">
          <h3 style="color: white;margin: 0;">{{ profil.statut }}</h3>
          <p style="padding: 0;margin: 0;" v-if="profil.statut.includes('Entreprise')">({{ profils.statut_entreprise }})</p>
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