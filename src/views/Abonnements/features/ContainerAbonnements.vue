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
  statut_talent_choice_entreprise:{
 type:String,
  required:false,
  default:null
  },
  statut_talent_choice_artisan:{
  type:String,
  required:false,
  default:null
  },
  statut_talent_choice:{
  type:String,
  required:false,
  default:null
  },
  notUseIncludesForArtisan:{
  type:Boolean,
  required:false,
  default:false
  },
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
// const userConnected = ref(localStorage.getItem('user'))
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
        console.log('containerabonnement1234556',data)
  // storeAbonnement.createAbonement(data)
}



function handleSelect_mode_Payement(val) {
  select_mode_payment_tab.value = val
}

// Détecte si le user est connecté et possède un statut
const isUserConnected = computed(() => {
  return store.state.user;
});

const filteredTabsSubAbonnement = computed(() => {
 
  if (props.statut_talent_choice) {
    console.log('lancer avec user')
    return props.tabsSubAbonnement.filter(
    item => item.id === props.statut_talent_choice
  );
  }
  if(props.statut_talent_choice_entreprise){
    return props.tabsSubAbonnement.filter(
    item => item.id.includes(props.statut_talent_choice_entreprise)
  );
  }
  if(props.statut_talent_choice_artisan){
    if(props.notUseIncludesForArtisan){
 return props.tabsSubAbonnement.filter(
    item => item.id == props.statut_talent_choice_artisan
  );
    }else{
 return props.tabsSubAbonnement.filter(
    item => item.id.includes(props.statut_talent_choice_artisan)
  );
    }
    
  }
  if(props.type_abonnements.includes('Artisan')){
    return props.tabsSubAbonnement.some(item =>
      item.id.includes("Artisan")
    );
  }

return props.tabsSubAbonnement.some(item =>
      item.id.includes("Vétéran")
    );
  
});

const tabsToDisplay = computed(() => {
  if(props.statut_talent_choice || props.statut_talent_choice_entreprise 
  || props.statut_talent_choice_artisan){
return Array.from(
        new Map(
          (filteredTabsSubAbonnement.value || []).map(item => [
            item.id,
            item
          ])
        ).values()
      )
    
  }
  return Array.from(
        new Map(
          (props.tabsSubAbonnement || []).map(item => [
            item.id,
            item
          ])
        ).values()
      );
  
  
});

const ecriteauFormule = (item) => {
  const categorie = item?.categorie?.categorie?.toLowerCase();
  const libelle = item?.libelle?.toUpperCase();

  const rules = {
    etudiant: {
      "BROBROLI+":
        "Pour être vu avant les autres. Et décrocher plus.",

      "BROBROLI":
        "Pour commencer à décrocher tes premières missions.",
    },
    artisan:{
      "BROBROLI+":
        "Pour être le premier appelé. Sur les urgences comme sur les gros chantiers.",

      "BROBROLI":
        "Pour que tes clients te trouvent. Pour que tes marchés te croisent.",
    },
    professionnel:{
      "BROBROLI+":
        "Pour que les DRH et décideurs vous trouvent en premier. Même si vous êtes déjà en poste.",
      "BROBROLI":
        "Pour que les bonnes entreprises trouvent votre profil. Chaque mission payée à l’exécution.",
    },
    vétéran:{
      "BROBROLI+":
        "Pour que les organisations qui cherchent une expertise rare vous trouvent directement.",

      "BROBROLI":
        "Pour que les bonnes organisations trouvent votre expertise. Chaque engagement payé avant exécution.",
    },
    particulier:{
      "BROBROLI HOME MAX":
        "Publication illimitée. Vos annonces en tête. Les meilleurs profils vous trouvent en premier..",

      "BROBROLI HOME":
        `Accédez aux profils vérifiés. Publiez vos besoins. Payez facilement.
        `,
    }
  };

  return rules?.[categorie]?.[libelle] || "Choisiraze cette formule";
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
watch(
  filteredTabsSubAbonnement,
  (newTabs) => {
    if (
      Array.isArray(newTabs) &&
      newTabs.length > 0
    ) {
      select_mode_payment_tab.value = newTabs[0].id;
    }
  },
  { immediate: true }
);
onMounted(async () => {
  console.log("props.tabsSubAbonnement", props.tabsSubAbonnement)
  console.log("localTabs.value", localTabs.value)
  console.log("PROFILE_ABONNEMENT",storeAbonnement.profilHybride)

  elmentsOfBtn.value = [
    {
      name_btn: await transalteStore.handleTranslate("Choisires cette formule"),
      color_btn: "primary",
    },
  ]
profilHybrideRecuperer.value = storeAbonnement?.profilHybride?.length
console.log('profilHybrideRecuperer.value23',profilHybrideRecuperer.value)
console.log('store.state?.user',store.state?.user)
  texte.value = await transalteStore.handleTranslate("année")
  if(!props.notUseIncludesForArtisan){
 const profilHybridesIfUserConnected = store.state?.user?.user.statuses.filter(item=>item.statut !== store.state?.user?.user?.statut?.statut)
 console.log("profilHybridesIfUserConnected",profilHybridesIfUserConnected)
  if(store.state?.user && profilHybridesIfUserConnected.length){
    storeAbonnement.handleChangeInfoForAbonnement({profilHybride:profilHybridesIfUserConnected})
    if(!storeAbonnement.statutOfBase){
      // si la personne ne veut pas changer de statut de base on recupere lui son statut de base
   storeAbonnement.handleMyStatutOfBase(store.state?.user?.user?.statut_base)
    }
    
  }
  }
  
  console.log("PROFIL_HYBRIDES_AJOUTES",storeAbonnement?.profilHybride)
  console.log("IS_CHANGE_PROFIL",storeAbonnement?.isChangeProfil)
  console.log("storeAbonnement.addProfilHybride_container",storeAbonnement?.addProfilHybride)
     if(storeAbonnement.addProfilHybride.length){
    const profilUserCurrent = store.state?.user?.user?.abonement?.find(item=>item.statut === 'success')
    formuleAbonnementOfUserConnected.value = profilUserCurrent?.abonement?.libelle;

    console.log("PROFIL_HYBRIDE_ADD_CONTENT_ABONNEMENT",storeAbonnement?.addProfilHybride)
    console.log("profilUserCurrent",profilUserCurrent)
    console.log("formuleAbonnementOfUserConnected12",formuleAbonnementOfUserConnected.value)
  }

  if (isUserConnected.value) {
    await storeAbonnementUser.get_all_abonnement()
  }
})
</script>

<template>
  <!-- <p>{{ tabsToDisplay }}</p>
  <p>{{ filteredTabsSubAbonnement }}</p> -->
  <!-- <P>store.state?.user?.user/{{ store.state?.user?.user.statuses.filter(item=>item.statut !== store.state?.user?.user?.statut?.statut) }}</P>
   <p>tabsSubAbonnement:{{ tabsSubAbonnement }}</p>
   <P>storeAbonnement.addProfilHybride/{{storeAbonnement.addProfilHybride }}</P> -->
  <!-- <p>storeAbonnement.addProfilHybride:{{ storeAbonnement.addProfilHybride }}</p>
   <p>tabsSubAbonnement:{{ tabsSubAbonnement }}</p>
  <p>filteredTabsSubAbonnement:{{ filteredTabsSubAbonnement }}</p>
  <p>statut_talent_choice_entreprise:{{ statut_talent_choice_artisan }}</p>
  <p>statut_talent_choice_artisan:{{ statut_talent_choice_artisan }}</p> -->
  <div v-if="tabsSubAbonnement.length">
   <div style="display: flex;justify-content: center;">
     <n-tabs
     v-if="filteredTabsSubAbonnement"
  v-model:value="select_mode_payment_tab"
  type="segment"
  @update:value="handleSelect_mode_Payement"
  style="margin:1em 0;max-width: 400px;"
  >
  <n-tab-pane
    v-for="tab in tabsToDisplay"
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
 v-if="select_mode_payment_tab === 'Maitre Artisan'"
 :abonnements="subAbonnement"
 :type_abonnements="'Maitre Artisan'"
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
    <div v-if="!tabsSubAbonnement.length">
    <section v-if="!storeAbonnement.addProfilHybride.length" 
    style="display: flex;place-content: center;gap:0.5em;flex-wrap:wrap;">
    <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements
      )"
      :key="item.id"
      :class="
        item?.libelle == 'BROBROLI PRO' || item.libelle === 'BROBROLI HOME' || item?.libelle == 'BROBROLI' 
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
      "
    >
    <div
  :style="{
    position: 'relative',
    height: item.libelle === 'BROBROLI HOME' ? '60px' : '70px'
  }"
  >
<h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1>
       <p 
       v-if="['BROBROLI+','BROBROLI PRO MAX','BROBROLI HOME MAX'].includes(item.libelle)"
      style="padding: 0;position: absolute;top:34px;margin-right: -50px;transform: translateX(50px);">
        <small style="font-size: 0.6em;font-weight: bold;">★ FORMULE RECOMMANDÉE</small></p>
    </div>
      
      
     <p class="shadow-sm small" 
     style="font-weight: bold;
     text-align:center;
     background-color: rgb(255 255 255 / 40%);
     height: 80px;
     display: flex;
     flex-direction: column;
     justify-content: center;
    "
     :style="{
    margin: item.libelle === 'BROBROLI HOME' 
    && item?.categorie?.categorie == 'Particulier' ? '0.8em' : null,
    padding:item.libelle === 'BROBROLI' ? '0.9em' : '0.6em',
     }"
     >
      {{ ecriteauFormule(item) }}
     </p>
     
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <contentAbonnement 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      :type_abonnements="type_abonnements"
      />
    </div>
    <section v-else>
      <p style="text-align:center;position: absolute;right: 10px;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id"
          class="badge"
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
          :elmentsOfBtn="elmentsOfBtn"
          :shapeBtn="'round'"
          @created="handleCreateAbonnement(item)"
        />
      </div>
    </section>
    </div>
    </section>
    <section v-if="storeAbonnement.addProfilHybride.length"
    style="display: flex;place-content: center;gap:0.5em;flex-wrap:wrap;" 
    >
      <div v-if="formuleAbonnementOfUserConnected">  
      <div
      v-for="item in abonnements.filter(
        (item) => item.categorie.categorie === type_abonnements && item.libelle === formuleAbonnementOfUserConnected
      )"
      :key="item.id"
      :class="
        item?.libelle == 'BROBROLI PRO' || item.libelle === 'BROBROLI HOME' || item?.libelle == 'BROBROLI'
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
      "
    >
   
      <h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1>
     
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel'].some(role=>role === item?.categorie?.categorie)">
      <ContentAbonnementForAddProfilHybride 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      :type_abonnements="type_abonnements"
      />
    </div>
    <section v-else>
      <p style="text-align:center;position: absolute;right: 10px;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id"
          class="badge"
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
        item?.libelle == 'BROBROLI PRO' || item.libelle === 'BROBROLI HOME' || item?.libelle == 'BROBROLI'
          ? 'color_brobroli_pro'
          : 'color_brobroli_pro_max'
      "
    >
   
      <h1 class="text-center main-color" style="font-size: 1.5em;">
        {{ item.libelle }}
      </h1>
      
      <!-- <p>type_abonnements2:{{ type_abonnements }}</p> -->
    <div v-if="item?.categorie && ['Etudiant','Particulier','Artisan','Professionnel','Entreprise'].some(role=>role === item?.categorie?.categorie)">
      <ContentAbonnementForAddProfilHybride 
      :item="item"
      :elmentsOfBtn="elmentsOfBtn"
      :type_abonnements="type_abonnements"
      />
    </div>
    <section v-else>
      <p style="text-align:center;position: absolute;right: 10px;">
     <span
          v-if="storeAbonnementUser?.planAbonnement?.abonement_id === item.id"
          class="badge"
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
