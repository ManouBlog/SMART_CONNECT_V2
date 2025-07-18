<script>
import LiensNavBar from "../LiensNavBar.vue";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useMenuMobile } from "../../../../store-pinia/MenuMobile/useMenuMobileStore";
export default {
  name: "MenuMobileStudent",
  components: {
    LiensNavBar,
  },
  data() {
    return {texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27:"",};
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
  },
  async created() {

    this.texte = await this.handleTranslate(' Tableau de bord');
    this.texte1 = await this.handleTranslate('Mon profil');
    this.texte2 = await this.handleTranslate("Mes favoris");
    this.texte3 = await this.handleTranslate('Mes postulations');
    this.texte4 = await this.handleTranslate('Mes Contrats');
    this.texte5 = await this.handleTranslate(' Mes disponibilités');
    this.texte6 = await this.handleTranslate(`Mes abonnements`);
    this.texte7 = await this.handleTranslate('Déconnexion');
  },
};
</script>
<template>
   
    <li class="position-absolute deconnex">
        <router-link to="/dashboard/accueil" class="d-block">
         {{texte}}
        </router-link>
      </li>
      <LiensNavBar :texte="texte1" :route_lien="'profil'" />
  <li>
    <a href="#" @click.prevent="changeValueForshowMenuMobile" class="d-block lien">
      {{texte2}}
    </a>
  </li>
  
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/offre_postule" class="d-block">
      {{texte3}}
    </router-link>
  </li>
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/contrat" class="d-block">
      {{texte4}}
    </router-link>
  </li>
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/emploi_du_temps" class="d-block">
     {{texte5}}
    </router-link>
  </li>
  <!-- <li class="position-absolute deconnex">
    <router-link to="/dashboard/disponibilite" class="d-block">
      Planifier une disponibilité
    </router-link>
  </li> -->
  <LiensNavBar :texte="texte6" :route_lien="'dashboard-abonnements'" />
  <li class="position-absolute deconnex">
    <a href="#" @click.prevent="deconnexUser" class="fw-bold">{{texte7}}</a>
  </li>
</template>
<style scoped>
li {
  padding: 1em;
  list-style-type: none;
}
li a {
  font-weight: bold;
  color: black;
}
</style>
