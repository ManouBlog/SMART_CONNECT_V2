<script>
import instance from '../../../../../api/api';
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
export default {
  name: 'AddProflHybride',
  props: {
    ProfilsUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
        isLoading:true,
      choiceProfilHybrideForAdd:[],
      allProfilsHybrides:[],
      profilhybrideUserConnected:[],
      showModalChangeProfilOfBase: false,
      showModalAbonnements:false,
      selectedParseStatus:"",
 showModalAddProfilHybride:false,
 StatutArtisans:[
  { value: "Maitre Artisan", label: "Maitre Artisan" },
  { value: "Artisan", label: "Artisan" }
],
  niveauxEtudes:[
  // Aucun / base
  { value: "aucun", label: "Aucun niveau" },

  // Primaire
  { value: "cepe", label: "CEPE (Certificat d'Études Primaires et Élémentaires)" },

  // Collège
  { value: "6eme", label: "6ème" },
  { value: "5eme", label: "5ème" },
  { value: "4eme", label: "4ème" },
  { value: "3eme", label: "3ème" },
  { value: "bepc", label: "BEPC (Brevet d'Études du Premier Cycle)" },

  // Lycée
  { value: "2nde", label: "Seconde" },
  { value: "1ere", label: "Première" },
  { value: "terminale", label: "Terminale" },
  { value: "bac", label: "BAC" },

  // Professionnel / technique
  { value: "cap", label: "CAP (Certificat d'Aptitude Professionnelle)" },
  { value: "cqp", label: "CQP (Certificat de Qualification Professionnelle)" },
  { value: "bt", label: "BT (Brevet de Technicien)" },
  { value: "bp", label: "BP (Brevet Professionnel)" },
  { value: "bep", label: "BEP (Brevet d'Études Professionnelles)" },
  { value: "bts", label: "BTS (Brevet de Technicien Supérieur)" },
  { value: "dut", label: "DUT (Diplôme Universitaire de Technologie)" },
  { value: "licence_pro", label: "Licence professionnelle" },
  { value: "ingenieur", label: "Diplôme d'ingénieur" },

  // Supérieur général
  { value: "bac+1", label: "BAC+1" },
  { value: "bac+2", label: "BAC+2" },
  { value: "bac+3", label: "BAC+3 (Licence)" },
  { value: "bac+4", label: "BAC+4 (Maîtrise)" },
  { value: "bac+5", label: "BAC+5 (Master)" },
  { value: "bac+6", label: "BAC+6" },
  { value: "bac+7", label: "BAC+7" },
  { value: "doctorat", label: "Doctorat (BAC+8 et plus)" },
],
   formData: {
        niveauEtude: "",
        statutProArtisan: "",
        ville: "",
        quartier: "",
        commune: "",
        statut_professionnel_artisan:"",
        upload: null,
      },
      rules: {
        // Champs Artisan
        niveauEtude: [
          {
            required: true,
            message: "Veuillez choisir un niveau d'étude",
            type: "string",
            trigger: "change",
          },
        ],
        statutProArtisan: [
          {
            required: true,
            message: "Veuillez choisir un statut professionnel artisan",
            type: "string",
            trigger: "change",
          },
        ],
        // Champs Particulier
        ville: [
          {
            required: true,
            message: "Veuillez entrer une ville",
            trigger: "blur",
          },
        ],
        quartier: [
          {
            required: true,
            message: "Veuillez entrer un quartier",
            trigger: "blur",
          },
        ],
        commune: [
          {
            required: true,
            message: "Veuillez entrer une commune",
            trigger: "blur",
          },
        ],
        // Fichier
        upload: [
          {
            required: true,
            validator: (_, value) => {
              if (!value) {
                return Promise.reject("Veuillez Ajouter votre CNI");
              }
              return Promise.resolve();
            },
            trigger: "change",
          },
        ],
      },
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
  computed:{
 hasArtisanProfil() {
      return this.choiceProfilHybrideForAdd.some((item) =>
        item.statut?.includes("Artisan")
      );
    },
    hasParticulierProfil() {
      return this.choiceProfilHybrideForAdd.some((item) =>
        item.statut?.includes("Particulier")
      );
    },
  },
//  watch: {
//   optionsAnswer: {
//       handler(newValue) {
//         if (newValue === 'non') {
//           this.profilHybride = [];
//           return;
//         }
//       },
//       immediate: true
//     },
//     selectedStatus: {
//       handler(newValue) {
//         console.log("newValue",newValue.statut)
//         if (newValue.statut === 'Artisan') {
//           this.optionsAnswer = null
//           this.profilHybride = [];
//           return;
//         }
//       },
//       immediate: true
//     },
//     showModalChangeProfilOfBase:{
//        handler(newValue) {
        
//         if (!newValue) {
//          this.loadActiveChangedProfil(false)
//          this.addIdOfProfilBase(null)
//           return;
//         }
//       },
//       immediate: true
//     }
//   },
  methods: {
    loadActiveChangedProfil(payload) {
      const abonnementsStore = useAbonnementsStore()

       abonnementsStore.handleChangeProfil(payload)

      console.log("isChangeProfil",abonnementsStore.isChangeProfil)
    },
    addIdOfProfilBase(payload) {
      const abonnementsStore = useAbonnementsStore()

       abonnementsStore.handleMyStatutOfBase(payload)

      console.log("statutOfBase",abonnementsStore.statutOfBase)
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
    Etudiant: ['Professionnel', 'Artisan'],
    Professionnel: ['Artisan', 'Vétéran'],
    Artisan: ['Professionnel','Vétéran'],
    Vétéran: ['Particulier','Artisan'],
    Particulier: ['Entreprise'],
    Entreprise:['Entreprise']
  };

  const allowed = transitions[statutUser]
  console.log("allowed",allowed)
console.log("this.ProfilsUser", this.ProfilsUser)
  try {
    const response = await instance.get("listStatut");
    this.allStatuses = response.data.data.filter(item =>
      allowed.includes(item.statut)
    );
    this.allProfilsHybrides = response.data.data.filter(item =>item.statut === 'Particulier' || item.statut === 'Artisan');
    this.profilhybrideUserConnected = this.ProfilsUser.user?.statuses.filter(item => item.statut !==  this.ProfilsUser.user.statut.statut); 
    console.log("allStatuses2", {
      statut: this.allStatuses,
      profil: this.$store.state.infoUserConnected.user.statut
    });
    console.log("allProfilsHybrides", this.allProfilsHybrides);

  } catch (error) {
    console.log(error);
  }finally{
    this.isLoading = false;
  }
},
  },
  async created() {
    await this.lister_statut();
  },
}
</script>
<template>
    <section>
    <div v-if="isLoading">
    <p class="shimmer-text" style="text-align:center;padding:2em;">Chargement...</p>
  </div>
  <div v-if="!isLoading">
    <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
     Profils hybrides
    </label>
    <!-- {{ ProfilsUser.user?.statuses }}
    {{ ProfilsUser.user.statut.statut }} -->
     <!-- {{ choiceProfilHybrideForAdd }} -->
    <div class="round-container">
      <label 
        v-for="item in allProfilsHybrides" 
        :key="item.id"
        class="round-item"
      >
        <input
          type="checkbox"
          :value="item"
          v-model="choiceProfilHybrideForAdd"
          :disabled="profilhybrideUserConnected.some(profil => profil.statut === item.statut)"
        />
        <span class="round-label">
          {{ item.statut }}
        </span>
      </label>
    </div>
  </div> 
 
  <div v-if="choiceProfilHybrideForAdd.length" >
    <a-form
  ref="formRef"
  layout="vertical"
  :model="formData"
  :rules="rules"
>
    <!-- Artisan -->
    <a-form-item v-if="hasArtisanProfil" label="Niveau d'étude" name="niveauEtude">
      <a-select
    v-model:value="formState.niveauEtude"
    placeholder="Sélectionnez votre niveau d’étude"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in niveauxEtudes"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
    </a-form-item>

    <a-form-item  v-if="hasArtisanProfil" label="Statut professionnel artisan" name="statut_professionnel_artisan">
    <a-select
    style="width: 100%;"
    v-model:value="formState.statut_professionnel_artisan"
    placeholder="Sélectionnez votre Statut professionnel"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in StatutArtisans"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
    </a-form-item>

    <!-- Particulier -->
    <a-form-item v-if="hasParticulierProfil" label="Ville" name="ville">
      <a-input v-model:value="formData.ville" />
    </a-form-item>
    <a-form-item v-if="hasParticulierProfil" label="Quartier" name="quartier">
      <a-input v-model:value="formData.quartier" />
    </a-form-item>
    <a-form-item v-if="hasParticulierProfil" label="Commune" name="commune">
      <a-input v-model:value="formData.commune" />
    </a-form-item>

    <a-form-item label="Ajouter votre CNI (carte nationale d'identité)" name="file">
      <!-- <input type="file" @change="handleFileChange" /> -->
      <a-upload
              v-model:fileList="formState.upload"
              :maxCount="1"
              accept="image/*"
              @change="handleFileChange"
            >
              <a-button>Clique pour charger </a-button>
            </a-upload>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="validateAndSubmit">
        Ajouter
      </a-button>
    </a-form-item>
</a-form>
  </div>
  <!-- <div v-if="choiceProfilHybrideForAdd.length">
     <section  v-if="choiceProfilHybrideForAdd.some(item => item.statut.includes('Artisan'))">
       <select>
        <option value="" disabled selected>Choisissez un niveau d'etude...</option>
        <option value="bac">Bac</option>
        <option value="bac+2">Bac +2</option>
        <option value="bac+3">Bac +3</option>
      </select>
      <select>
        <option value="" disabled selected>Choisissez un statut professionnel artisan...</option>
        <option value="bac">Bac</option>
        <option value="bac+2">Bac +2</option>
        <option value="bac+3">Bac +3</option>
      </select>
      </section>
      <section v-if="choiceProfilHybrideForAdd.some(item => item.statut.includes('Particulier'))">
       <input type='text' v-model="ville" placeholder='Entrez un nouveau profil hybride...' />
       <input type='text' v-model="quartier" placeholder='Entrez un nouveau profil hybride...' />
      <input type='text' v-model="commune" placeholder='Entrez un nouveau profil hybride...' />
      </section>
  
      <input type="file" @change="handleFileChange" />
      <div>
        <button type="button" @click="addProfilHybride">Ajouter</button>
      </div>
  </div> -->
    </section>
</template>
<style scoped>
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