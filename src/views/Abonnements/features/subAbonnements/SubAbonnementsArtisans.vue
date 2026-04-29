<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
// import { Help } from "../../../../utils";
// import Buttons from "../../../../Shared/Compoments/Buttons.vue";
import {useStore} from "vuex"
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../../store-pinia/Entreprise/useEntreprisesStore";
import ContainerAbonnementsArtisans from '../ContainerAbonnementsArtisans.vue'
defineProps({
  abonnements: Array,
  type_abonnements: String,
});


const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();
// const userConnected = ref(localStorage.getItem('user'))
const store = useStore();
const elmentsOfBtn = ref(null);
const texte = ref(null);
const profilHybrideRecuperer = ref(0)



// const handleCreateEntreprise=(payload)=>{
//      console.log("payload sub abonnement artisan",payload)
//   const randomPart = Math.random().toString(36).substring(2);
     
//         const data = {
//             abonement_id:payload.id,
//             channels:"undefined",
//             transaction_id:randomPart
//         }
//         console.log("subabonnementARtisan23",data)
//   // storeAbonnement.createAbonement(data)
// }

// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return store.state?.user;
});

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
  elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate("Choisirxcv cette formule"),
      color_btn: "primary",
    },
  ];

  texte.value = await transalteStore.handleTranslate("année");
  console.log("PROFILE_ABONNEMENT_SUB_ARTISAN",storeAbonnement.profilHybride)
   profilHybrideRecuperer.value = storeAbonnement?.profilHybride?.length
  if (isUserConnected.value) {
      await storeAbonnementUser.get_all_abonnement();
    }
});
</script>

<template>

  <div class="conteneur-flex">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      :class="
        item?.libelle == 'BROBROLI'
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
      "
    >
   
      <!-- <h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1> -->
 <div style="position: relative;height:70px;">
<h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1>
       <p 
      v-if="item.libelle === 'BROBROLI+'"
      style="padding: 0;position: absolute;top:34px;margin-right: -50px;transform: translateX(50px);">
        <small style="font-size: 0.6em;font-weight: bold;">★ FORMULE RECOMMANDÉE</small></p>
    </div>
      
      
      
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel','Maitre Artisan'].some(role=>role === item?.categorie?.categorie)">
      <ContainerAbonnementsArtisans 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      :type_abonnements="type_abonnements"
      />
    </div>
    <!-- <section v-else>
      <p style="text-align:center;position: absolute;top: 10px;right: 10px;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id"
          class="badge bg-warning"
        >
          Formule
        </span>
  </p>
       <div class="d-flex align-items-center gap-5 justify-content-center main-color">
       
          <h1 style="font-size: 2em; font-weight: bold">
            {{ Help.convertInMoney(item.prix) }} F
          </h1>
          <h3 class="mx-2" style="font-size: 1em; color:white">/</h3>
          <h3 style="font-size: 2em; color:white">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
       

        <Buttons
          :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateEntreprise(item)"
        />
      </div>
    </section> -->
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
