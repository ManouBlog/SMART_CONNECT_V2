<script>
import LiensNavBar from "../LiensNavBar.vue";
import { mapActions } from "pinia";
import { useMenuMobile } from "../../../../store-pinia/MenuMobile/useMenuMobileStore";
export default {
  name: "MenuMobileStudent",
  components: {
    LiensNavBar,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
  },
};
</script>
<template>
    <LiensNavBar :texte="'Mon profil'" :route_lien="'profil'" />
    <li class="position-absolute deconnex">
        <router-link to="/dashboard/accueil" class="d-block">
          Tableau de bord
        </router-link>
      </li>
  <li>
    <a href="#" @click.prevent="changeValueForshowMenuMobile" class="d-block lien">
      Liste des favoris
    </a>
  </li>
  
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/offre_postule" class="d-block">
      Mes postulations
    </router-link>
  </li>
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/contrat" class="d-block">
      Mes Contrats
    </router-link>
  </li>
  <li class="position-absolute deconnex">
    <router-link to="/dashboard/emploi_du_temps" class="d-block">
      Mes disponibilités
    </router-link>
  </li>
  <!-- <li class="position-absolute deconnex">
    <router-link to="/dashboard/disponibilite" class="d-block">
      Planifier une disponibilité
    </router-link>
  </li> -->
  <LiensNavBar :texte="`Mes abonnements`" :route_lien="'dashboard-abonnements'" />
  <li class="position-absolute deconnex">
    <a href="#" @click.prevent="deconnexUser" class="fw-bold"> Déconnexion</a>
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
