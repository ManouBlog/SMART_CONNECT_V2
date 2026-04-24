<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { Help } from "../../../utils";
import Buttons from "../../../Shared/Compoments/Buttons.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useAbonnementsStore } from "../../../store-pinia/Abonnements/useAbonnementsStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
import contentAbonnement from './contentAbonnement.vue'
import ContentAbonnementForAddProfilHybride from './ContentAbonnementForAddProfilHybride.vue'
import { useStore } from 'vuex'
import SubAbonnementsEntreprise from "./subAbonnements/SubAbonnementsEntreprise.vue"
import SubAbonnementsArtisans from "./subAbonnements/SubAbonnementsArtisans.vue"
import SubAbonnementsVeteran from "./subAbonnements/SubAbonnementsVeteran.vue";
const props = defineProps({
  abonnements: Array,
  type_abonnements: String,
  subAbonnement:{
   type: Array,
    default: () => []
  },
  tabsSubAbonnement: {
    type: Array,
    default: () => []
  },
  
});


const transalteStore = useTranslateStore();
const storeAbonnement = useAbonnementsStore();
const storeAbonnementUser = useEntreprisesStore();
const userConnected = ref(localStorage.getItem('user'))
const formuleAbonnementOfUserConnected = ref(null)
const elmentsOfBtn = ref(null);
const texte = ref(null);
const localTabs = ref([])
const profilHybrideRecuperer = ref(0)
const store = useStore();

const select_mode_payment_tab = ref("");

const handleCreateAbonnement=(payload)=>{
  console.log("handleCreateAbonnement456")
  const randomPart = Math.random().toString(36).substring(2);
        const data = {
            abonement_id:payload.id,
            channels:"undefined",
            transaction_id:randomPart
        }
  storeAbonnement.createAbonement(data)
}



function handleSelect_mode_Payement(val) {
  select_mode_payment_tab.value = val
}

// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return userConnected.value;
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

watch(
  () => props.tabsSubAbonnement,
  async (newVal) => {
    if (!Array.isArray(newVal) || newVal.length === 0) return

    localTabs.value = newVal

    // ✅ Assure que la sélection par défaut est toujours définie
    if (!select_mode_payment_tab.value) {
      select_mode_payment_tab.value = newVal[0]?.id
    }

    console.log("tabsSubAbonnement updated", newVal)
  },
  { immediate: true }
)

onMounted(async () => {
  console.log("props.tabsSubAbonnement", props.tabsSubAbonnement)
  console.log("localTabs.value", localTabs.value)
  console.log("PROFILE_ABONNEMENT",storeAbonnement.profilHybride)

  elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate("Choisir cette formule"),
      color_btn: "primary",
    },
  ]
profilHybrideRecuperer.value = storeAbonnement?.profilHybride?.length
  texte.value = await transalteStore.handleTranslate("année")

     if(storeAbonnement.addProfilHybride.length){
    const profilUserCurrent = store.state?.user?.user?.abonement?.find(item=>item.statut === 'success')
    formuleAbonnementOfUserConnected.value = profilUserCurrent?.abonement?.libelle;

    console.log("PROFIL_HYBRIDE_ADD_CONTENT_ABONNEMENT",storeAbonnement.addProfilHybride)
    console.log("profilUserCurrent",profilUserCurrent)
    console.log("formuleAbonnementOfUserConnected12",formuleAbonnementOfUserConnected.value)
  }

  if (isUserConnected.value) {
    await storeAbonnementUser.get_all_abonnement()
  }
})
</script>

<template>
  <div  v-if="tabsSubAbonnement.length">
   <div style="display: flex;justify-content: center;">
     <n-tabs
     v-if="tabsSubAbonnement.some(item=>item.id.includes('Vétéran'))"
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;max-width: 400px;"
  >
  <n-tab-pane
    v-for="tab in Array.from(new Map(
  tabsSubAbonnement.map(item => [item.id, item])
).values())"
    :key="tab.id"
    :name="tab.id"
    :tab="tab.label"
  />
 </n-tabs>
  <n-tabs
  v-else
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;max-width: 300px;"
  >
  <n-tab-pane
    v-for="tab in Array.from(new Map(
  tabsSubAbonnement.map(item => [item.id, item])
).values())"
    :key="tab.id"
    :name="tab.id"
    :tab="tab.label.split(' ')[1]"
  />
 </n-tabs>
   </div>

 <SubAbonnementsEntreprise 
 v-if="select_mode_payment_tab === 'Entreprise Informelle'"
 :abonnements="subAbonnement"
 :type_abonnements="'Entreprise Informelle'"
 />
 <SubAbonnementsEntreprise 
 v-if="select_mode_payment_tab === 'Entreprise Formelle'"
 :abonnements="subAbonnement"
 :type_abonnements="'Entreprise Formelle'"
 />
 <SubAbonnementsArtisans 
 v-if="select_mode_payment_tab === 'Maitre-Artisan'"
 :abonnements="subAbonnement"
 :type_abonnements="'Maitre-Artisan'"
 />
 <SubAbonnementsArtisans 
 v-if="select_mode_payment_tab === 'Artisan'"
 :abonnements="subAbonnement"
 :type_abonnements="'Artisan'"
 />
 <SubAbonnementsVeteran
 v-if="select_mode_payment_tab === 'Vétéran Hors Grade'"
 :abonnements="subAbonnement"
 :type_abonnements="'Vétéran Hors Grade'"
 />
 <SubAbonnementsVeteran
 v-if="select_mode_payment_tab === 'Vétéran Senior'"
 :abonnements="subAbonnement"
 :type_abonnements="'Vétéran Senior'"
 />
 <SubAbonnementsVeteran
 v-if="select_mode_payment_tab === 'Vétéran'"
 :abonnements="subAbonnement"
 :type_abonnements="'Vétéran'"
 />
</div>
  <div class="conteneur-flex" v-else>
    <section v-if="!storeAbonnement.addProfilHybride.length">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      :class="
        item?.categorie?.categorie == 'Etudiant'
          ? 'abonnement-classique_etudiant'
          : 'abonnement-classique_entreprise'
      "
      style="flex: 1;"
    >
   
      <h1 class="text-center main-color">
        {{ item.libelle }}
      </h1>
      
      
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <contentAbonnement 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      />
    </div>
    <section v-else>
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
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
        <Buttons
          :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateAbonnement(item)"
        />
      </div>
    </section>
    </div>
    </section>
    <section v-if="storeAbonnement.addProfilHybride.length">
      <div v-if="formuleAbonnementOfUserConnected">
 <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements && item.libelle === formuleAbonnementOfUserConnected
      )"
      :key="item.id"
      :class="
        item?.categorie?.categorie == 'Etudiant'
          ? 'abonnement-classique_etudiant'
          : 'abonnement-classique_entreprise'
      "
      style="flex: 1;"
    >
   
      <h1 class="text-center main-color">
        {{ item.libelle }}
      </h1>
      
      
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <ContentAbonnementForAddProfilHybride 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      />
    </div>
    <section v-else>
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
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
        <Buttons
          :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateAbonnement(item)"
        />
      </div>
    </section>
    </div>
      </div>
      <div v-if="!formuleAbonnementOfUserConnected">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      :class="
        item?.categorie?.categorie == 'Etudiant'
          ? 'abonnement-classique_etudiant'
          : 'abonnement-classique_entreprise'
      "
    >
   
      <h1 class="text-center main-color">
        {{ item.libelle }}
      </h1>
      
      
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <ContentAbonnementForAddProfilHybride 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      />
    </div>
    <section v-else>
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
          <h3 class="mx-2" style="font-size: 1em; color: orange">/</h3>
          <h3 style="font-size: 2em; color: orange">an</h3>
        </div>
       <div style="height: 310px; position: relative; padding: 1em">
        <div class="px-5" v-html="item.description"></div>
      </div>

      <div class="conteneur-btn">
        <Buttons
          :isDisabled="storeAbonnementUser?.planAbonnement?.abonement_id == item.id"
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateAbonnement(item)"
        />
      </div>
    </section>
    </div>
      </div>
   
    </section>
   
  </div>
</template>

<style scoped>
:deep(.n-tabs .n-tabs-rail .n-tabs-tab-wrapper .n-tabs-tab.n-tabs-tab--active){
  background-color:#25535f !important;
}
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
  color: orange;
}
.conteneur-btn {
  height: 120px;
}
</style>
