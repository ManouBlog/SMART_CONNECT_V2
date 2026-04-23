<script>
import { StatutUser } from "../../../utils/liensNavbar";

export default {
  name: "LiensNavBar",
  props: {
    texte: String,
    route_lien: String,
    statut_user: String,
    isNeedConnection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: null,
      StatutUser: StatutUser,
    };
  },
  methods:{
hasAnyStatus(statuses, map){
  return (statuses || []).some(s => map[s.statut]);
   }
  },
  computed: {
    texte_lien() {
      return this.texte;
    },
    route() {
      return this.route_lien;
    },
    isUserConected() {
      return this.isNeedConnection;
    },
    chooseLangue() {
      return this.chooseConteneurLanguage;
    },
  },
};
</script>
<template>
  <li
    v-if="
    this.$store.state.user &&
    this.hasAnyStatus(this.$store.state.user?.user?.statuses, this.StatutUser)
  "
  >
    <router-link :to="{ name: route_lien }" class="d-block lien">
      {{ texte_lien }}
    </router-link>
  </li>

  <li v-else-if="!isNeedConnection">
    <router-link :to="{ name: route_lien }" class="d-block lien">
      {{ texte_lien }}
    </router-link>
  </li>
</template>
<style scoped>
li a {
  font-weight: bold;
  color: black;
}
</style>
