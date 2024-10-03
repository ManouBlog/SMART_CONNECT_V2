<script>
export default {
  name: "InfoStudent",
  props: {
    texte: String,
    route_lien: String,
    statut_user: String,
    isNeedConnection: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      data: null,
    };
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
  chooseLangue(){
    return this.chooseConteneurLanguage
  }
  },
  
};
</script>
<template>
    <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
        <router-link to="/dashboard/accueil"> Tableau de bord </router-link>
      </li>
      <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
        <n-collapse arrow-placement="right">
          <n-collapse-item title="Offres" name="1">
            <router-link to="/dashboard/offre_postule" class="d-block">
              Postulées
            </router-link>
            <router-link to="/dashboard/contrat" class="d-block">
              Contrat
              <span
                class="alarm-badge"
                v-if="this.$store.state.contratStudent > 0"
              >
                {{ this.$store.state.contratStudent }}
              </span>
            </router-link>
          </n-collapse-item>
        </n-collapse>
      </li>
      <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
        <n-collapse arrow-placement="right">
          <n-collapse-item title="Calendrier" name="1">
            <router-link to="/dashboard/emploi_du_temps" class="d-block">
              Mes disponibilités
            </router-link>
            <router-link to="/dashboard/disponibilite" class="d-block">
              Enregistrer
            </router-link>
          </n-collapse-item>
        </n-collapse>
      </li>
</template>
