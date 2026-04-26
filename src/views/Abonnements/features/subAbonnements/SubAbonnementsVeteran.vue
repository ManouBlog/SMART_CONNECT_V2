<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../../utils";
import { useStore } from 'vuex';
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
// import ContainerAbonnementVeterans from '../ContainerAbonnementVeterans.vue'
const props = defineProps({
  abonnements: Array,
  type_abonnements: String,
});


const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();
// const userConnected = ref(localStorage.getItem('user'))
 const store = useStore();
// const elmentsOfBtn = ref(null);
const texte = ref(null);
const profilHybrideRecuperer = ref(0)



const handleInitialiserPayement=(payload)=>{
  const STORE_ABONNEMENT = useAbonnementsStore();
  const randomPart = Math.random().toString(36).substring(2);
  console.log('STORE_ABONNEMENT.diplome',STORE_ABONNEMENT.diplome)
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            transaction_id:randomPart,
            mode_payment:"year",
            isChangeProfil:STORE_ABONNEMENT.isChangeProfil,
            statut_base:STORE_ABONNEMENT.statutOfBase,
            treatment_preferentiel:STORE_ABONNEMENT.treatment_preferentiel,
             niveauExpertise : STORE_ABONNEMENT.niveauExpertise,
        modeTravail : STORE_ABONNEMENT.modeTravail,
        tempsTravail : STORE_ABONNEMENT.tempsTravail ,
        niveauEtude : STORE_ABONNEMENT.niveauEtude +" "+ STORE_ABONNEMENT.diplome,
        CVupload : STORE_ABONNEMENT.CVupload ,
        statut_talent : STORE_ABONNEMENT.statut_talent ,
        }
       console.log("payload sub abonnement veteran",{
        payload:payload,
        data:data,
        storeAbonnement:STORE_ABONNEMENT
       })
      
       
    // storeAbonnement.createAbonement(data)
}

// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return store.state.user;
});

const filteredAbonnementsByTalent = computed(() => {
  // if (isUserConnected.value){
  //    return props.abonnements.filter((item) => item?.categorie?.categorie === store.state?.user?.statut_talent);
  // }

  return props.abonnements.filter((item) => item.categorie.categorie === props.type_abonnements)
});

const getMessageAbonnement = (type, item) => {
  const libelle = item?.libelle?.trim().toUpperCase();

  console.log("MESSAGE_ABONNEMENT", type);
  console.log("libelle_abonnement_message", libelle);

  if (type === "Etudiant") {
    const map = {
      "BROBROLI PRO": "Commence maintenant",
      "BROBROLI PRO MAX": "Je passe à BROBROLI PRO MAX",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  if (type === "Professionnel") {
    const map = {
      "BROBROLI PRO": "Créer mon profil BROBROLI PRO",
      "BROBROLI PRO MAX": "Accéder à BROBROLI PRO MAX",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  if (type?.includes("Vétéran")) {
    const map = {
      "BROBROLI PRO": "Créer mon profil BROBROLI PRO",
      "BROBROLI PRO MAX": "Accéder à BROBROLI PRO MAX",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  return "Choisir cette formule";
};

const ecriteauFormule = (item) => {
  const categorie = item?.categorie?.categorie?.toLowerCase();
  const libelle = item?.libelle?.toUpperCase();

  const rules = {
    vétéran:{
      "BROBROLI PRO MAX":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI PRO":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
    'vétéran hors grade':{
      "BROBROLI PRO MAX":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI PRO":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
  'vétéran senior':{
      "BROBROLI PRO MAX":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI PRO":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
  };

  return rules?.[categorie]?.[libelle] || "Choisire cette formule";
};

// Watch déclenche le chargement des abonnements
watch(
  isUserConnected,
 (newValue) => {
    // console.log("NEW VALUE", isUserConnected);
    if (!newValue) {
     storeAbonnementUser.putPlanAbonnementAtNull();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  
  console.log("PROFILE_ABONNEMENT_SUB_VETERAN",storeAbonnement.profilHybride)
profilHybrideRecuperer.value = storeAbonnement?.profilHybride?.length
  texte.value = await transalteStore.handleTranslate("année");
  if (isUserConnected.value) {
      await storeAbonnementUser.get_all_abonnement();
    }
});
</script>

<template>
  <!-- <p>isUserConnected:{{ isUserConnected.statut_talent }}</p>
  <p>filteredAbonnementsByTalent:{{ filteredAbonnementsByTalent }}</p>
 <p> abonneùments sub abonnement :{{ abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      ) }}
 {{ type_abonnements }} </p> -->
  <div class="conteneur-flex">
    <div
      v-for="item in filteredAbonnementsByTalent"
      :key="item.id"
      :class="
        item?.libelle == 'BROBROLI PRO'
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
      "
    >
   
      <h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1>
      <p class="shadow-sm p-2 small" 
      style="font-weight: bold;
      text-align:center;
      background-color: rgb(255 255 255 / 40%);
      padding:1em;">
      {{ ecriteauFormule(item) }}
     </p>
      
      
    <!-- <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <ContainerAbonnementVeterans 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      />
    </div> -->
    <section>
      <p style="text-align:center;position: absolute;top: 10px;right: 10px;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id"
          class="badge bg-warning"
        >
          Formule
        </span>
  </p>
       <div class="d-flex align-items-center gap-5 justify-content-center main-color">
         <div style="display: flex;flex-direction: column;">
   <h1 
    :style="{
    fontSize: '2em',
    fontWeight: 'bold',
    padding: '0',
    margin: '0',
    textDecoration: Help.calculateAbonnementPrice(item.prix,profilHybrideRecuperer) != item.prix ? 'line-through' : 'none'
  }">
      {{ Help.convertInMoney(item.prix) }} F
    </h1>
    <h1 
     v-if="Help.calculateAbonnementPrice(item.prix,profilHybrideRecuperer) != item.prix"
    style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
      {{ Help.convertInMoney(Help.calculateAbonnementPrice(item.prix,profilHybrideRecuperer)) }} F
    </h1>
  </div>
          <h3 class="mx-2" style="font-size: 1em; color:white">/</h3>
          <h3 style="font-size: 2em; color:white">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
        <Buttons
          :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id"
          :elmentsOfBtn=" [
    {
      name_btn: getMessageAbonnement(props.type_abonnements,item),
      color_btn: 'primary',
    }
  ]"
          :shapeBtn="'round'"
          @created="handleInitialiserPayement(item)"
        />
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>

.btn-confirm {
  background-color: orange;
  cursor: pointer;
  color: white;
  font-weight: bold;
  border: none;
  padding: 1em;
  border-radius: 10px;
  transition: all 0.2s ease;
}

/* ÉTAT DISABLED */
.btn-confirm:disabled {
  background-color: #d1d1d1;
  color: #888;
  cursor: not-allowed;
  opacity: 0.7;
}
:deep(.my-custom-paragraph) {
  font-size: 16px !important;
  margin-top: 1em;
}
.conteneur-flex {
  display: flex !important;
  justify-items: center !important;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
}
.cart_modal{
  background-color: white;
  box-shadow: 1px 1px 1px solid rgba(0, 0, 0, 0.379);
  height:300px;
  width:90%;
  padding:1em;
  overflow: auto;
  border-radius: 10px;
}
.cart_modal select{
  border-radius: 10px;
}
.modal_choose_periode{
  position:fixed;
  display: flex;
  z-index: 999;
  width:100%;
  justify-content: center;
  place-content: center;
  align-items: center;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.299);
}
.main-color {
  color: rgb(254, 254, 254);
}
.conteneur-btn {
  height: 120px;
}
</style>
