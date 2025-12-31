<script>
/* eslint-disable */
import BadgeCompVue from "./BadgeComp.vue";
export default {
  name: "NavbarDash",
  components: {
    BadgeCompVue,
  },
  data() {
    return {
      user: this.$store.state.user,
      statut: this.$store.state.user.statut.statut,
    };
  },
  methods: {
    get_users() {
      this.$store.dispatch("get_users");
    },
   
  },
  created() {
    this.get_users();
    
  },
};
</script>
<template>
  <div class="sidebar-wrapper" style="overflow: auto">
    <div style="background: var(--theme-deafult)">
      <div class="logo-wrapper">
        <a href="#"
          ><img
            class="w-75 for-light"
            src="../assets/broboli_footer_1.png"
            alt="broboli_footer.png"
        /></a>
        <div class="back-btn"><i class="fa fa-angle-left"></i></div>
      </div>
      <div>
        <ul class="liste_liens">
          <li style="display: flex; align-items: center; gap: 0.1em; color: white">
            <i class="bi bi-house-door position-absolute" style="margin-left: -1.2em"></i
            ><router-link :to="{ name: 'Accueil' }">
              <strong>Tableau de bord</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-grid-1x2" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Categorie' }"
              ><strong> Domaines </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-grid-1x2" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Competences' }"
              ><strong> Postes </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'entreprise'"
          >
            <i class="bi bi-briefcase" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'offres' }"
              ><strong> Mes offres </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'entreprise'"
          >
            <i class="bi bi-people" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'student_contacts_by_entreprise' }">
              <strong> Personnels Contactés</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'entreprise'"
          >
            <i class="bi bi-people" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'OffreInteressByStudents' }">
              <strong> Postulants à mon offre</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'etudiant'"
          >
            <i class="bi bi-calendar-date" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'create_timetable' }">
              <strong> Mon calendrier </strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'etudiant'"
          >
            <i class="bi bi-briefcase" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'see_offres_postuler' }">
              <strong> Offres postulées </strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'etudiant'"
          >
            <i class="bi bi-building" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'see_who_interesse_by_profil_student' }">
              <strong>Contrat-entreprises</strong></router-link
            >
          </li>

          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-people" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'users_beta' }">
              <strong>Utilisateurs bêta</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-people" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'users' }">
              <strong> Utilisateurs </strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-building" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'entreprises' }" @click.prevent="get_users">
              <strong>Entreprises</strong>
              <BadgeCompVue
                v-if="this.$store.state.nbreBadgeEntreprise > 0"
                :nbreTotal="this.$store.state.nbreBadgeEntreprise"
              />
            </router-link>
          </li>

          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-person" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'students' }">
              <strong>Etudiants</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-envelope-paper" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'newsletter' }">
              <strong>Messages</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-briefcase" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'all_Offres' }">
              <strong>Offres</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-pencil-square" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Contrat' }"> <strong>Contrat</strong></router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-credit-card-2-back" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'abonnement' }">
              <strong>Abonnements</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-cash-stack" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'transactions' }">
              <strong>Historique de paiement</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-chat-quote" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'temoignages' }">
              <strong>Témoignages</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-people-fill" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'partenaires' }">
              <strong>Partenaires</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-card-image" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'publicite' }">
              <strong>Publicité</strong></router-link
            >
          </li>

          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-calendar" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'date_lancement' }">
              <strong>Date de lancement</strong></router-link
            >
          </li>
        </ul>
      </div>
      <nav class="sidebar-main">
        <div class="right-arrow" id="right-arrow">
          <i data-feather="arrow-right"></i>
        </div>
      </nav>
    </div>
  </div>
</template>
<style scoped>
@import url("../assets/css/navbar-dash.css");
li a {
  color: white;
}
</style>
