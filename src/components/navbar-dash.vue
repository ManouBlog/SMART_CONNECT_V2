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

      // setTimeout(function () {
      //   $("#MyTableData_entreprise","#MyTableData_entreprise2").DataTable({
      //     pagingType: "full_numbers",
      //     pageLength: 10,
      //     processing: true,
      //     order: [],
      //     language: {
      //       décimal: "",
      //       emptyTable: "Aucune donnée disponible dans le tableau",
      //       infoEmpty: "Showing 0 to 0 of 0 entries",
      //       info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
      //       infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
      //       infoPostFix: "",
      //       thousands: ",",
      //       lengthMenu: "Afficher les entrées du _MENU_",
      //       loadingRecords: "Loading...",
      //       processing: "Processing...",
      //       search: "Chercher :",
      //       stateSave: true,
      //       zeroRecords: "Aucun enregistrement correspondant trouvé",
      //       paginate: {
      //         first: "Premier",
      //         last: "Dernier",
      //         next: "Suivant",
      //         previous: "Précédent",
      //       },
      //       aria: {
      //         sortAscending: ": activate to sort column ascending",
      //         sortDescending: ": activate to sort column descending",
      //       },
      //     },
      //   });
      // }, 10);
    },
  },
  created() {
    this.get_users();
    console.log("badgeEntreprise", this.$store.state.nbreBadgeEntreprise);
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
              ><strong> Catégorie d'offre </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-grid-1x2" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Competences' }"
              ><strong> Compétences talents </strong>
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
          <!-- <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
          >
            <i class="bi bi-person-plus" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'modify_profil' }">
              <strong> Mon compte</strong></router-link
            >
          </li> -->
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
            <router-link :to="{ name: 'entreprises' }">
              <strong>Entreprises</strong>
              <BadgeCompVue
                v-if="this.$store.state.nbreBadgeEntreprise > 0"
                :nbreTotal="this.$store.state.nbreBadgeEntreprise"
              />
            </router-link>
          </li>
          <!-- <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-person" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'students_visiteurs' }">
              <strong>Visiteurs</strong></router-link
            >
          </li> -->
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
            <i class="bi bi-person" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'newsletter' }">
              <strong>Newsletter</strong></router-link
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
            <i class="bi bi-pencil-square" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'partenaires' }">
              <strong>Partenaires</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="statut == 'admin'"
          >
            <i class="bi bi-pencil-square" style="margin-left: -1.2em"></i>
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
