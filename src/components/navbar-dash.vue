<script>
export default {
  name: "NavbarDash",
  data() {
    return {
      user: this.$store.state.user,
      statut: this.$store.state.user.statut.statut,
    };
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
            src="../assets/broboli_footer.png"
            alt="broboli_footer.png"
        /></a>
        <div class="back-btn"><i class="fa fa-angle-left"></i></div>
      </div>
      <div>
        <ul class="liste_liens">
          <li style="color: white">
            <i class="bi bi-house-door position-absolute"></i
            ><router-link :to="{ name: 'Accueil' }">
              <strong>Tableau de bord</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-grid-1x2"></i>
            <router-link :to="{ name: 'Categorie' }"
              ><strong> Catégorie </strong>
            </router-link>
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-grid-1x2"></i>
            <router-link :to="{ name: 'Competences' }"
              ><strong> Compétences </strong>
            </router-link>
          </li>
          <li style="color: white" v-if="statut == 'entreprise'">
            <i class="bi bi-briefcase"></i>
            <router-link :to="{ name: 'offres' }"
              ><strong> Mes offres </strong>
            </router-link>
          </li>
          <li style="color: white" v-if="statut == 'entreprise'">
            <i class="bi bi-people"></i>
            <router-link :to="{ name: 'student_contacts_by_entreprise' }">
              <strong> Personnels Contactés</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'entreprise'">
            <i class="bi bi-people"></i>
            <router-link :to="{ name: 'OffreInteressByStudents' }">
              <strong> Postulants à mon offre</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'etudiant'">
            <i class="bi bi-calendar-date"></i>
            <router-link :to="{ name: 'create_timetable' }">
              <strong> Mon calendrier </strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'etudiant'">
            <i class="bi bi-briefcase"></i>
            <router-link :to="{ name: 'see_offres_postuler' }">
              <strong> Offres postulées </strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'etudiant'">
            <i class="bi bi-building"></i>
            <router-link :to="{ name: 'see_who_interesse_by_profil_student' }">
              <strong>Contrat-entreprises</strong></router-link
            >
          </li>
          <li style="color: white">
            <i class="bi bi-person-plus"></i>
            <router-link :to="{ name: 'modify_profil' }">
              <strong> Mon compte</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-people"></i>
            <router-link :to="{ name: 'users' }">
              <strong> Utilisateurs </strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-building"></i>
            <router-link :to="{ name: 'entreprises' }">
              <strong>Entreprises</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-person"></i>
            <router-link :to="{ name: 'students' }">
              <strong>Talents</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-briefcase"></i>
            <router-link :to="{ name: 'all_Offres' }">
              <strong>Offres</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-pencil-square"></i>
            <router-link :to="{ name: 'Contrat' }">
              <strong>Contrat</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-pencil-square"></i>
            <router-link :to="{ name: 'abonnement' }">
              <strong>Abonnements</strong></router-link
            >
          </li>
          <li style="color: white" v-if="statut == 'admin'">
            <i class="bi bi-cash-stack"></i>
            <router-link :to="{ name: 'transactions' }">
              <strong>Transactions</strong></router-link
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
