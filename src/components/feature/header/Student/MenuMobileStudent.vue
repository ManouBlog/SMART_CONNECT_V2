<script>
import LiensNavBar from "../LiensNavBar.vue";
import instance from "../../../../api/api";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useMenuMobile } from "../../../../store-pinia/MenuMobile/useMenuMobileStore";
import { useNotificationsStore } from "../../../../store-pinia/useNotificationsStore";

export default {
  name: "MenuMobileStudent",
  components: { LiensNavBar },

  data() {
    return {
      texte: "",
      texte1: "",
      texte2: "",
      texte3: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte40: "",
    };
  },
  computed: {
    ...mapState(useNotificationsStore, ["unreadNotifications"]),
    userStatut() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.user?.statuses ?? null;
    } catch (e) {
      return null;
    }
  }
  },

  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    ...mapActions(useNotificationsStore, ["getListNotification"]),

    async goTo(route) {
      if (!route) return;
    
      this.changeValueForshowMenuMobile();

      await this.$store.dispatch("getInfoUser");
      const userInfo = this.$store.state.infoUserConnected;
     
      if (!userInfo) return;

      const qualifications = userInfo.qualifications || [];
      const competences = userInfo.competences || [];
      const disponibilites = userInfo.jours || [];

      if (
  (userInfo.user?.statuses || []).some(s => s.statut === 'Etudiant') &&
  (!qualifications.length || !competences.length)
) {
  this.$router.push("/dashboard/profil");
  return;
}

if (
  (userInfo.user?.statuses || []).some(s => s.statut === 'Etudiant') &&
  !disponibilites.length
) {
  this.$router.push("/dashboard/emploi_du_temps");
  return;
}

      this.$router.push(route);
    },

    async seeMyNotifications() {
      try {
        const response = await instance.get("markAllAsRead");
        if (response.status === 200) {
          this.getListNotification();
          this.goTo({ name: "notifications" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    this.getListNotification();
    this.texte = await this.handleTranslate("Tableau de bord");
    this.texte1 = await this.handleTranslate("Mon espace");
    this.texte2 = await this.handleTranslate("Mes favoris");
    this.texte3 = await this.handleTranslate("Mes candidatures");
    this.texte40 = await this.handleTranslate("Recruteurs intéressés");
    this.texte5 = await this.handleTranslate("Mes disponibilités");
    this.texte6 = await this.handleTranslate("Mes abonnements");
    this.texte7 = await this.handleTranslate("Déconnexion");
  },
};
</script>

<template>
  <li class="position-absolute deconnex">
    <a class="d-block" @click="goTo('/dashboard/accueil')">
      {{ texte }}
    </a>
  </li>

  <li class="position-absolute deconnex">
    <a class="d-block" @click="seeMyNotifications">
      Mes Notifications
      <span v-if="unreadNotifications.length > 0" class="badge bg-danger">
        {{ unreadNotifications.length }}
      </span>
    </a>
  </li>

  <LiensNavBar
    :texte="texte1"
    :route_lien="'profil'"
    @click="changeValueForshowMenuMobile"
  />

  <li class="position-absolute deconnex">
    <a class="d-block" @click="goTo('/dashboard/entreprises_interessees')">
     Recruteurs intéressés
    </a>
  </li>

  <li class="position-absolute deconnex">
    <a class="d-block" @click="goTo('/dashboard/offre_postule')">
      Mes candidatures
    </a>
  </li>

  <li class="position-absolute deconnex" v-if="userStatut?.some(s=>s.statut == 'Etudiant') ">
    <a class="d-block" @click="goTo('/dashboard/emploi_du_temps')">
      Mes disponibilités
    </a>
  </li>

  <LiensNavBar
    :texte="texte6"
    :route_lien="'dashboard-abonnements'"
    @click="changeValueForshowMenuMobile"
  />

  <li class="position-absolute">
    <a class="d-block" @click="goTo('/avis')"> Votre avis </a>
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
