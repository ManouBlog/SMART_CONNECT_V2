<script>
import instance from '../../../../../api/api';
import FieldsVeteran from '../FieldsForEachProfil/FieldsVeteran.vue'
import FieldsArtisan from '../FieldsForEachProfil/FieldsArtisan.vue';
import FieldsProfessionnel from '../FieldsForEachProfil/FieldsProfessionnel.vue'
import FieldsCompany from '../FieldsForEachProfil/FieldsCompany.vue';
export default {
  name: 'InfoStatusesUser',
  components:{FieldsVeteran,FieldsArtisan,FieldsProfessionnel,FieldsCompany},
  props: {
    profils: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showModalBadgeVerifi: false,
      showModalAbonnements:false,
// allStatutsCompany:[{ value: "Artisan", label: "Artisan" }],
 allProfilHybrideAnswer: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
],
optionsAnswer:null,
selectedStatus:"",
profilHybride:[],
allStatuses:[]
    }
  },
  methods: {
    openVerification(userStatut) {
      this.$emit('open-verification', userStatut);
    },
    resetData(){
this.optionsAnswer=null;
this.selectedStatus="";
this.profilHybride=[];
this.allStatuses=[];
    },
     async lister_statut() {
  const user = this.$store.state.infoUserConnected?.user;
  const statutUser = user?.statut.statut;

  const transitions = {
    Etudiant: ['Professionnel', 'Artisan'],
    Professionnel: ['Artisan', 'Veteran'],
    Artisan: ['Professionnel','Veteran'],
    Particulier: ['Entreprise']
  };

  const allowed = transitions[statutUser]
  console.log("allowed",allowed)

  try {
    const response = await instance.get("listStatut");

    this.allStatuses = response.data.data.filter(item =>
      allowed.includes(item.statut)
    );

    console.log("allStatuses2", {
      statut: this.allStatuses,
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
          <h3>Changer de profil</h3>
        </div>
      </template>
      
      <section v-if="allStatuses.length"
  
      >
        <div class="w-100 mb-4">
            <label for="statusSelect">Séléctionnez un profil</label>
            <select 
      name="status" 
      id="statusSelect"
      v-model="selectedStatus"
      class="form-select rounded-4 shadow-sm border-0 w-100"
      style="min-height: 50px"
      :disabled="!allStatuses.length"
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
        :value="value"
      >
        {{ value.statut }}
      </option>
           </select>
        </div>
  <transition name="fade-slide">
 <div v-if="selectedStatus">
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
  <div v-if="optionsAnswer === 'oui'">
    <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
     Profils disponibles
    </label>

    <div class="round-container" v-if="selectedStatus.statut !== 'Entreprise'">
      <label 
        v-for="item in allStatuses.filter(item=>item.statut !== selectedStatus.statut)" 
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
    <div class="round-container" v-else>
      <label 
        v-for="item in allStatutsCompany" 
        :key="item.value"
        class="round-item"
      >
        <input
          type="checkbox"
          :value="item.value"
          v-model="profilHybride"
        />
        <span class="round-label">
          {{ item.label }}
        </span>
      </label>
    </div>
  </div>
</transition>
  <div v-if="optionsAnswer">
  <FieldsVeteran 
   v-if="selectedStatus.statut === 'Veteran'"/>
  <FieldsArtisan v-if="selectedStatus.statut === 'Artisan'" />
  <FieldsProfessionnel 
  :profilHybride="profilHybride"
  v-if="selectedStatus.statut === 'Professionnel'" />
  <FieldsCompany 
  v-if="selectedStatus.statut === 'Entreprise'"
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
    <div class="info-header d-flex justify-content-between align-items-center p-4 mb-5">
      <h1 class="fw-bold my-3 mb-0" style="color: orange">Mes Profils</h1>
      <button
          style="
            height: auto;
            width: auto;
            background: orange;
            color: white;
            font-weight: bold;
            border-radius: 10%;
            padding:0.5em;
          "
          @click="async()=>{
            showModalBadgeVerifi = !showModalBadgeVerifi
             await this.lister_statut();
          }"
        >
          Modifier
        </button>
      <!-- <button
        class="btn btn-warning fw-bold rounded-pill px-4 py-2 shadow-sm"
        style="background: orange; color: white; border: none;"
        
      >
        Modifier
      </button> -->
    </div>

    <!-- Grille profils responsive -->
    <div class="p-4">
      <div v-if="profils.length === 0" class="text-center py-5 opacity-50">
        <i class="bi bi-people display-4 mb-3" style="color: var(--third-color)"></i>
        <h5>Aucun profil</h5>
      </div>
      
      <div v-else class="row g-2">
        <div v-for="(profil, index) in profils" :key="index" 
             class="col-12 col-md-4">
          
          <!-- Carte profil avec tes couleurs -->
          <div style="display: flex;">
            <!-- Header image/statut -->
            <div class="position-relative p-3 text-center">
              <div class="avatar-placeholder rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                   style="width: 55px; height: 55px; background: orange; color: white;border-radius: 10px;">
                <i class="bi bi-person-fill fs-3"></i>
              </div>
              
              <!-- Badge statut -->
              <span class="badge position-absolute top-0 end-0" 
                    style="background: orange; color: white;">
                {{ profil.statut }}
              </span>
            </div>
          </div>
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