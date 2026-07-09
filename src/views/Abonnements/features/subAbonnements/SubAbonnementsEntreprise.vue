<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../../utils";
import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import { useStore } from 'vuex'
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
// import contentAbonnement from '../contentAbonnement.vue'
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



const handleCreateEntrepriseByYear = (payload) => {

  console.log("handleCreateEntrepriseByYear", payload)
  console.log("handleCreateEntrepriseByYear_storeAbonnement", storeAbonnement)

  const statutBaseUser = store.state.user?.user?.statut_base;

  const randomPart = `web${Math.random().toString(36).substring(2)}`
  const data = {
    abonement_id: payload.id,
    channels: "undefined",
    mode_payment: 'year',
    transaction_id: randomPart,
    isAddProfilHybride: storeAbonnement.addProfilHybride.map(item => item.id).length ? true : false,
    statut_base: storeAbonnement.statutOfBase ? storeAbonnement.statutOfBase : statutBaseUser,
    isChangeProfil: storeAbonnement.isChangeProfil,
    profilHybride: storeAbonnement.statutOfBase == 1 ? [] : storeAbonnement.profilHybride?.map(item => item.id),
    addProfilHybrideOnly: storeAbonnement.isAddProfilHybride ? storeAbonnement.addProfilHybride.map(item => item.id) : [],
    nom: storeAbonnement.nom,
    cni: storeAbonnement.cni,
    registre_pdf: storeAbonnement.registre_pdf,
    logo: storeAbonnement.logo_entreprise,
    statut_entreprise: storeAbonnement.statut_entreprise,
    email_cc: storeAbonnement.email_cc,
    Phonegerant: storeAbonnement.Phonegerant,
    gerant: storeAbonnement.gerant,
    ncc: storeAbonnement.ncc,
    juridique: storeAbonnement.juridique,
    matricule_cc: storeAbonnement.matricule_cc,
    addProfilHybride: storeAbonnement.addProfilHybride
  }

  console.log("DATAEND", data)

  const formData = new FormData();

  // On vérifie chaque valeur avant l'ajout
  if (data.abonement_id) formData.append('abonement_id', data.abonement_id);
  if (data.channels && data.channels !== 'undefined') formData.append('channels', data.channels);
  if (data.mode_payment) formData.append('mode_payment', data.mode_payment);


  if (data.transaction_id) formData.append('transaction_id', data.transaction_id);
  if (data.isAddProfilHybride !== undefined) formData.append('isAddProfilHybride', data.isAddProfilHybride);
  if (data.statut_base) formData.append('statut_base', data.statut_base);
  if (data.isChangeProfil !== undefined) formData.append('isChangeProfil', data.isChangeProfil);

  if (data.profilHybride?.length) {
    data.profilHybride
      .map(item => item.id)
      .forEach(id => {
        formData.append("profilHybride[]", id);
      });
  }
  if (data.cni) formData.append('cni', data.cni);
  if (data.registre_pdf) formData.append('registre_pdf', data.registre_pdf);
  if (data.logo) formData.append('logo', data.logo);

  if (data.addProfilHybride?.length) {
    data.addProfilHybride
      .map(item => item.id)
      .forEach(id => {
        formData.append("addProfilHybrideOnly[]", id);
      });
  }

  if (data.email_cc?.length) {
    data?.email_cc?.forEach(item => {
      formData.append("email_cc[]", item);
    });
  }
  // Autres champs
  if (data.nom) formData.append('nom', data.nom);
  if (data.expertise) formData.append('expertise', data.expertise);
  if (data.photo) formData.append('photo', data.photo);
  if (data.diplome) formData.append('diplome', data.diplome);
  if (data.ville) formData.append('ville', data.ville);
  if (data.commune) formData.append('commune', data.commune);
  if (data.quartier) formData.append('quartier', data.quartier);
  if (data.statut_professionnel_artisan) formData.append('statut_professionnel_artisan', data.statut_professionnel_artisan);
  if (data.statut_entreprise) formData.append('statut_entreprise', data.statut_entreprise);

  if (data.Phonegerant) formData.append('numero_gerant', data.Phonegerant);
  if (data.gerant) formData.append('gerant', data.gerant);
  if (data.email) formData.append('email', data.email);
  if (data.phone) formData.append('phone', data.phone);
  if (data.ncc) formData.append('ncc', data.ncc);
  if (data.juridique) formData.append('forme_juridique', data.juridique);
  if (data.matricule_cc) formData.append('matricule_cc', data.matricule_cc);
  if (data.contact) formData.append('contact', data.contact);

  console.log("formData21", formData)

  storeAbonnement.createAbonement(formData)
}


// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return store.state.user;
});

const ecriteauFormule = (item) => {
  const categorie = item?.categorie?.categorie?.toLowerCase();
  const libelle = item?.libelle?.toUpperCase();

  const rules = {
    'entreprise formelle': {
      "BROBROLI PRO MAX":
        "Publication illimitée. Vos annonces en tête. Les meilleurs profils vous trouvent en premier.",

      "BROBROLI PRO":
        "Accédez aux profils vérifiés. Publiez vos besoins. Payez facilement.",
    },
    'entreprise informelle': {
      "BROBROLI PRO MAX":
        "Publication illimitée. Vos annonces en tête. Les meilleurs profils vous trouvent en premier.",

      "BROBROLI PRO":
        "Accédez aux profils vérifiés. Publiez vos besoins. Payez facilement.",
    },
  };

  return rules?.[categorie]?.[libelle] || "Choisirwxcvbn cette formule";
};

const messageAbonnement = (item) => {
  const type = props.type_abonnements;
  const libelle = item?.libelle?.trim().toUpperCase();

  if (
    type === "Entreprise Formelle" ||
    type === "Entreprise Informelle"
  ) {
    const mapMessages = {
      "BROBROLI PRO": "Créer mon compte BROBROLI",
      "BROBROLI PRO MAX": "Passe à BROBROLI PRO MAX",
    };

    return mapMessages[libelle] || "Choisir cette formule";
  }

  return "Choisirsdes cette formule";
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
  await store.dispatch('getInfoUser');
  texte.value = await transalteStore.handleTranslate("année");
  if (store.state.user) {
    if (store.state.user?.user?.statuses.some(item => item.statut === 'Entreprise')) {
      profilHybrideRecuperer.value = storeAbonnement?.profilHybride?.length
    }
    await storeAbonnementUser.get_all_abonnement();
  }
});
</script>

<template>
  <!-- {{  store.state.user }} -->
  <div class="conteneur-flex">
    <div v-for="item in abonnements.filter(
      (item) => item.categorie.categorie === type_abonnements
    )" :key="item.id" :class="item?.libelle == 'BROBROLI PRO'
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
        ">
      <div style="position: relative;height:70px;">
        <h1 class="text-center main-color" style="font-size: 1.5em;">
          {{ item.libelle }}
        </h1>
        <p v-if="item.libelle === 'BROBROLI PRO MAX'"
          style="padding: 0;position: absolute;top:34px;margin-right: -50px;transform: translateX(50px);">
          <small style="font-size: 0.6em;font-weight: bold;">★ FORMULE RECOMMANDÉE</small>
        </p>
      </div>
      <p class="shadow-sm small" style="
    font-weight: bold;
    text-align: center;
    background-color: rgb(255 255 255 / 40%);
    height: 80px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     " :style="{
      margin: item.libelle === 'BROBROLI PRO' ? '0.8em' : null,
      padding: item.libelle === 'BROBROLI PRO' ? '0.9em' : '0.6em',
    }">
        {{ ecriteauFormule(item) }}
      </p>


      <!-- <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel','Entreprise'].some(role=>role === item?.categorie?.categorie)">
      <contentAbonnement 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      />
    </div> -->
      <section>
        <p style="text-align:center;position: absolute;right: 0px;top:0px;">
          <span v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id" class="badge">
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


          <Buttons :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id" :elmentsOfBtn='[
            {
              name_btn: messageAbonnement(item),
              color_btn: "primary",
            },
          ]' :shapeBtn="'round'" @created="handleCreateEntrepriseByYear(item)" />
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
