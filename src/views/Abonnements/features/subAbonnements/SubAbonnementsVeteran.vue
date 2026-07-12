<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../../utils";
import { useStore } from 'vuex';
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";


const props = defineProps({
  abonnements: Array,
  type_abonnements: String,
});


const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();

const store = useStore();
// const elmentsOfBtn = ref(null);
const texte = ref(null);
const profilHybrideRecuperer = ref(0)



const handleInitialiserPayement = (payload) => {
  // const STORE_ABONNEMENT = useAbonnementsStore();
  const randomPart = `web${Math.random().toString(36).substring(2)}`
  const statutBaseUser = store.state?.user?.user?.statut_base;
  // console.log('STORE_ABONNEMENT', STORE_ABONNEMENT)

  const formData = new FormData();

formData.append("abonement_id", payload.id);
formData.append("channels", "undefined");
formData.append("mode_payment", "year");
formData.append("transaction_id", randomPart);

formData.append(
  "isAddProfilHybride",
  storeAbonnement.addProfilHybride.length ? "1" : "0"
);

formData.append(
  "statut_base",
  storeAbonnement.statutOfBase || statutBaseUser
);

formData.append(
  "isChangeProfil",
  storeAbonnement.isChangeProfil ? "1" : "0"
);

formData.append(
  "treatment_preferentiel",
  storeAbonnement.treatment_preferentiel ?? ""
);

formData.append(
  "niveauExpertise",
  storeAbonnement.niveauExpertise ?? ""
);

formData.append(
  "modeTravail",
  storeAbonnement.modeTravail ?? ""
);

formData.append(
  "cni_carte",
  storeAbonnement.cni_carte ?? ""
);

formData.append(
  "tempsTravail",
  storeAbonnement.tempsTravail ?? ""
);

formData.append(
  "niveauEtude",
  storeAbonnement.niveauEtude ?? ""
);

formData.append(
  "statut_talent",
  storeAbonnement.statut_talent ?? ""
);

formData.append(
  "ville",
  storeAbonnement.ville ?? ""
);

formData.append(
  "commune",
  storeAbonnement.commune ?? ""
);

formData.append(
  "quartier",
  storeAbonnement.quartier ?? ""
);

formData.append(
  "statut_professionnel_artisan",
  storeAbonnement.statut_professionnel_artisan ?? ""
);

// Fichiers
if (storeAbonnement.CVupload) {
  formData.append("CVupload", storeAbonnement.CVupload);
}

if (storeAbonnement.upload) {
  formData.append("cni_carte", storeAbonnement.upload);
}

// Tableaux
storeAbonnement.profilHybride?.forEach((item) => {
  formData.append("profilHybride[]", String(item.id));
});

storeAbonnement.addProfilHybride.forEach((item) => {
  formData.append("addProfilHybrideOnly[]", String(item.id));
});
  storeAbonnement.createAbonement(formData)
  // console.log("data",formData)
}

// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return store.state.user;
});

const filteredAbonnementsByTalent = computed(() => {

  return props.abonnements.filter((item) => item.categorie.categorie === props.type_abonnements)
});

const getMessageAbonnement = (type, item) => {
  const libelle = item?.libelle?.trim().toUpperCase();

  if (type === "Etudiant") {
    const map = {
      "BROBROLI": "Commence maintenant",
      "BROBROLI+": "Je passe à BROBROLI+",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  if (type === "Professionnel") {
    const map = {
      "BROBROLI": "Créer mon profil BROBROLI",
      "BROBROLI+": "Accéder à BROBROLI+",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  if (type?.includes("Vétéran")) {
    const map = {
      "BROBROLI": "Créer mon profil BROBROLI",
      "BROBROLI+": "Accéder à BROBROLI+",
    };

    return map[libelle] || "Je passe à Brobroli";
  }

  return "Choisir cette formule";
};

const ecriteauFormule = (item) => {
  const categorie = item?.categorie?.categorie?.toLowerCase();
  const libelle = item?.libelle?.toUpperCase();

  const rules = {
    vétéran: {
      "BROBROLI+":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
    'vétéran hors grade': {
      "BROBROLI+":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
    'vétéran senior': {
      "BROBROLI+":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
  };

  return rules?.[categorie]?.[libelle] || "Choisiretrois cette formule";
};

// Watch déclenche le chargement des abonnements
watch(
  isUserConnected,
  (newValue) => {
    if (!newValue) {
      storeAbonnementUser.putPlanAbonnementAtNull();
    }
  },
  { immediate: true }
);

onMounted(async () => {
 
  texte.value = await transalteStore.handleTranslate("année");
  if (isUserConnected.value) {
    if(!storeAbonnement.addProfilHybride.length){
    profilHybrideRecuperer.value = isUserConnected.value.user.statuses.filter(item=>item.id != isUserConnected.value.user.statut_base).length
   
    }else{
    profilHybrideRecuperer.value = storeAbonnement?.addProfilHybride?.length
    // console.log("profilHybrideRecuperer.value2",profilHybrideRecuperer.value)
    }
    await storeAbonnementUser.get_all_abonnement();
  }
  // console.log('filteredAbonnementsByTalent',filteredAbonnementsByTalent)
  // console.log("storeAbonnementUser_veteran",storeAbonnement.addProfilHybride)
  // console.log('storeAbonnementUser?.planAbonnement',storeAbonnementUser?.planAbonnement)
});
</script>

<template>
 
  <!-- si la personne connectee a un abonnement -->
   <div class="conteneur-flex" v-if="storeAbonnementUser?.planAbonnement && storeAbonnementUser?.planAbonnement.statut === 'success' 
   && storeAbonnement.addProfilHybride.length">
    <div v-for="item in filteredAbonnementsByTalent.filter(item=> item.id == storeAbonnementUser?.planAbonnement.abonement_id)" :key="item.id" 
    :class="item?.libelle == 'BROBROLI'
      ? 'color_brobroli_pro'
      : 'color_brobroli_pro_max'
      ">
      
      <div style="position: relative;height:70px;">
        <h1 class="text-center main-color" style="font-size: 1.5em;">
          {{ item.libelle }}
        </h1>
        <p v-if="item.libelle === 'BROBROLI+'"
          style="padding: 0;position: absolute;top:34px;margin-right: -50px;transform: translateX(50px);">
          <small style="font-size: 0.6em;font-weight: bold;">★ FORMULE RECOMMANDÉE</small>
        </p>
      </div>
      <p class="shadow-sm p-2 small" style="font-weight: bold;
      text-align:center;
      background-color: rgb(255 255 255 / 40%);
      padding:1em;
      height: 80px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     ">
        {{ ecriteauFormule(item) }}
      </p>

      <section>
        <p style="text-align:center;position: absolute;right: 0px;top:0px;">
          <span v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id" style="background-color: green;"
            class="badge">
            Active
          </span>
        </p>
        <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <div style="display: flex;flex-direction: column;">
            <h1 :style="{
              fontSize: '2em',
              fontWeight: 'bold',
              padding: '0',
              margin: '0',
              textDecoration: Help.calculateAbonnementForAddProfilHybridePrice(item.prix, profilHybrideRecuperer) != item.prix ? 'line-through' : 'none'
            }">
              {{ Help.convertInMoney(item.prix) }} F
            </h1>
            <h1 v-if="Help.calculateAbonnementForAddProfilHybridePrice(item.prix, profilHybrideRecuperer) != item.prix"
              style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
              {{ Help.convertInMoney(Help.calculateAbonnementForAddProfilHybridePrice(item.prix, profilHybrideRecuperer)) }} F
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
          
          :elmentsOfBtn="[
            {
              name_btn: getMessageAbonnement(props.type_abonnements, item),
              color_btn: 'primary',
            }
          ]" :shapeBtn="'round'" @created="handleInitialiserPayement(item)" />
        </div>
      </section>
    </div>
  </div>
   <!-- si la personne connectee n a pas un abonnement -->
  <div class="conteneur-flex" v-else>
    <div v-for="item in filteredAbonnementsByTalent" :key="item.id" 
    :class="item?.libelle == 'BROBROLI'
      ? 'color_brobroli_pro'
      : 'color_brobroli_pro_max'
      ">
      
      <div style="position: relative;height:70px;">
        <h1 class="text-center main-color" style="font-size: 1.5em;">
          {{ item.libelle }}
        </h1>
        <p v-if="item.libelle === 'BROBROLI+'"
          style="padding: 0;position: absolute;top:34px;margin-right: -50px;transform: translateX(50px);">
          <small style="font-size: 0.6em;font-weight: bold;">★ FORMULE RECOMMANDÉE</small>
        </p>
      </div>
      <p class="shadow-sm p-2 small" style="font-weight: bold;
      text-align:center;
      background-color: rgb(255 255 255 / 40%);
      padding:1em;
      height: 80px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     ">
        {{ ecriteauFormule(item) }}
      </p>

      <section>
        <p style="text-align:center;position: absolute;right: 0px;top:0px;">
          <span v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id" style="background-color: green;"
            class="badge">
            Active
          </span>
        </p>
        <div class="d-flex align-items-center gap-5 justify-content-center main-color">
          <div style="display: flex;flex-direction: column;">
            <h1 :style="{
              fontSize: '2em',
              fontWeight: 'bold',
              padding: '0',
              margin: '0',
              textDecoration: Help.calculateAbonnementPrice(item.prix, profilHybrideRecuperer) != item.prix ? 'line-through' : 'none'
            }">
              {{ Help.convertInMoney(item.prix) }} F
            </h1>
            <h1 v-if="Help.calculateAbonnementPrice(item.prix, profilHybrideRecuperer) != item.prix"
              style="font-size: 2em; font-weight: bold;padding: 0;margin: 0;">
              {{ Help.convertInMoney(Help.calculateAbonnementPrice(item.prix, profilHybrideRecuperer)) }} F
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
          :elmentsOfBtn="[
            {
              name_btn: getMessageAbonnement(props.type_abonnements, item),
              color_btn: 'primary',
            }
          ]" :shapeBtn="'round'" @created="handleInitialiserPayement(item)" />
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

.cart_modal {
  background-color: white;
  box-shadow: 1px 1px 1px solid rgba(0, 0, 0, 0.379);
  height: 300px;
  width: 90%;
  padding: 1em;
  overflow: auto;
  border-radius: 10px;
}

.cart_modal select {
  border-radius: 10px;
}

.modal_choose_periode {
  position: fixed;
  display: flex;
  z-index: 999;
  width: 100%;
  justify-content: center;
  place-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.299);
}

.main-color {
  color: rgb(254, 254, 254);
}

.conteneur-btn {
  height: 120px;
}
</style>
