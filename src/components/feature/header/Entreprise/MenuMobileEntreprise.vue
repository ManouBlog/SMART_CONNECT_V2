<script>
import LiensNavBar from "../LiensNavBar.vue";
import { mapActions } from "pinia";
import { useMenuMobile } from "../../../../store-pinia/MenuMobile/useMenuMobileStore";
export default {
  name: "MenuMobileEntreprise",
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
  <li>
    <router-link
      :to="{ name: 'timetable' }"
      @click.prevent="changeValueForshowMenuMobile"
      class="d-block lien"
    >
      Talents
    </router-link>
  </li>
  <li>
    <a href="#" @click.prevent="changeValueForshowMenuMobile" class="d-block lien">
      Mes favoris
    </a>
  </li>
  <LiensNavBar :texte="'Mon profil'" :route_lien="'profil'" />
  <li>
    <router-link to="/dashboard/offre" class="d-block"> Liste des offres </router-link>
  </li>
  <li>
    <router-link to="/dashboard/creation_offre" class="d-block">
      Créer une offre
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/personnel" class="d-block"> Talents </router-link>
  </li>
  <li>
    <router-link to="/dashboard/postulants" class="d-block"> Postulants </router-link>
  </li>
  <LiensNavBar :texte="`Mes abonnements`" :route_lien="'dashboard-abonnements'" />
  <li class="position-absolute">
    <router-link to="/avis" class="d-block">
     Votre avis
    </router-link>
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
