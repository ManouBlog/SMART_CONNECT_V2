<script>
// import Swal from 'sweetalert2';
import instance from '../../../../../api/api';
import { useLoadingSpinner } from '../../../../../store-pinia/LoadingSpinner/useLoadingSpinner';
export default {
  name: 'DeleteProfilHybride',
  data() {
    return {
        isLoading:true,
        profilhyrideAtDelete:null,
profilHybride:[],
descriptionProfil:{
  Etudiant:"Tu as les compétences. Nous avons les clients. Postule aux missions disponibles partout en CI . Tu es payé sur le digital dès la première mission validée. Zéro agence. Zéro intermédiaire.",
  Artisan:"Ton métier mérite des clients sérieux. Publie tes compétences, reçois des missions partout. Tu arrives. C'est fait. Le client paye.",
  Particulier:"Trouvez un prestataire vérifié par d'autres particuliers. Paiement digital uniquement si le travail est fait. Zéro risque",
  Professionnel:"Votre expertise mérite d'être trouvée par les bonnes entreprises. Accédez aux mandats disponibles partout en CI, candidatez directement et recevez votre paiement digitalisé après chaque mission.",
  Vétéran:"Votre parcours est rare. Les organisations qui cherchent une expertise comme la vôtre sont sur MonBrobroli. Accédez aux mandats stratégiques, entrez en contact direct avec les décideurs et recevez votre paiement après chaque mandat. Votre expérience a enfin la plateforme qu'elle mérite.",
}
    }
  },
  methods: {
    async getProfilHybride(){
        try{
      await this.$store.dispatch("getInfoUser");
        const profilOfBase = this.$store.state.user.user.statut.statut;
        const ProfilHybrides = this.$store.state.user.user.statuses;
       this.profilHybride = ProfilHybrides.filter(item=>item.statut !== profilOfBase)
        }catch(error){
     console.log(error)
        }finally{
            this.isLoading = false
        }
       
    },
    async deletOneProfilHybride(){
        if(!this.profilhyrideAtDelete){
       const STORE_LOADING = useLoadingSpinner();
        STORE_LOADING.launchLoading(true)
        try{
         const response = await instance.delete('deletemyProfilHybride',{
            profilhyrideAtDelete:this.profilhyrideAtDelete
         })
         if(response.data.status){
            await this.$store.dispatch("getInfoUser");
         }
        }catch(error){
            console.log(error)
        }finally{
        STORE_LOADING.launchLoading(false)
        }
        }else{
            return;
        }
        
    }
  },
  async created() {
 await this.getProfilHybride()
  },
}
</script>

<template>
  <a-card 
  v-if="!isLoading"
    style="
      width: auto;
      color: var(--third-color) !important;
      background: var(--secondary-color) !important;
    "
  >
    <div class="p-4">
      <div
  :style="{
    display: 'flex',
    gap: '1em',
    width: '100%',
    flexWrap: 'wrap',
    placeContent: this.profilHybride?.length > 1 ? 'center' : 'flex-start',
  }"
>
           <div
  v-for="(profil, index) in profilHybride"
  :key="index"
  style="
    border: 3px solid white;
    background-color: #ffa500c2;
    padding: 1em;
    border-radius: 10px;
    position: relative;
    min-height: 100%;
    margin: 1em;
    width: 300px;
  "
>
  <!-- titre du statut -->
  <h3 style="color: white;">{{ profil.statut }}</h3>

  <!-- description -->
  <span>{{ descriptionProfil[profil.statut] }}</span>

  <!-- corbeille en absolu (haut à droite) -->
  <button
    style="
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #ff3f3f;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "
    @click="() => {
    console.log(profil.id)
    }"
  >
    <i class="bi bi-trash"></i>
  </button>
</div>
          
      </div>
    </div>
    
  </a-card>
  <div class="shimmer-text" style="text-align: center;" v-else>
        Chargement...
    </div>
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