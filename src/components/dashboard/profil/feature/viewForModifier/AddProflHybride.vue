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
  <div v-if="isLoading">
    <p class="shimmer-text" style="text-align:center;padding:2em;">Chargement...</p>
  </div>
  <div v-if="choiceProfilHybrideForAdd.length">
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
       <input type='text' v-model="VilleProfilHybride" placeholder='Entrez un nouveau profil hybride...' />
       <input type='text' v-model="QuatierProfilHybride" placeholder='Entrez un nouveau profil hybride...' />
      <input type='text' v-model="CommuneProfilHybride" placeholder='Entrez un nouveau profil hybride...' />
      </section>
  
      <input type="file" @change="handleFileChange" />
      <div>
        <button type="button" @click="addProfilHybride">Ajouter</button>
      </div>
  </div>
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