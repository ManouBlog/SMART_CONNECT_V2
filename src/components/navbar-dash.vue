<script>
// import "../../src/dash/js/jquery-3.5.1.min.js";
// import "../../src/dash/js/bootstrap/bootstrap.bundle.min.js";
// import "../../src/dash/js/icons/feather-icon/feather.min.js";
export default {
  name: "NavbarDash",
  data() {
    return {
      role: this.$store.state.role,
    };
  },


};
</script>
<template>
  <div class="sidebar-wrapper">
    <div>
      <div class="logo-wrapper">
        <a href="index.html"
          ><img
            class="img-fluid for-light"
            src="/src/dash/images/logo/small-logo.png"
            alt="" /><img
            class="img-fluid for-dark"
            src="/src/dash/images/logo/small-white-logo.png"
            alt=""
        /></a>
        <div class="back-btn"><i class="fa fa-angle-left"></i></div>
      </div>
      <div>
        <ul class="liste_liens">
          <li>
            <i class="bi bi-house-door position-absolute"></i
            ><router-link :to="{ name: 'Accueil' }">Accueil</router-link>
          </li>
          <li v-if="role == 'Entreprise'">
            <router-link :to="{ name: 'offres' }">Offres</router-link>
          </li>
          <li v-if="role == 'Etudiant'">
            <router-link :to="{ name: 'create_timetable' }"
              >Emploi du temps</router-link
            >
          </li>
          <li>
            <i class="bi bi-person-plus"></i>
            <router-link :to="{ name: 'modify_profil' }"
              >Mon espace</router-link
            >
          </li>
          <li v-if="role == 'admin'">
            <i class="bi bi-people"></i>
            <router-link :to="{ name: 'users' }">Utilisateurs</router-link>
          </li>
          <li v-if="role == 'admin'">
            <i class="bi bi-building"></i>
            <router-link :to="{ name: 'entreprises' }">Entreprises</router-link>
          </li>
          <li v-if="role == 'admin'">
            <i class="bi bi-person"></i>
            <router-link :to="{ name: 'students' }">Etudiants</router-link>
          </li>
          <li v-if="role == 'admin'">
            <router-link :to="{ name: 'all_Offres' }">Offres</router-link>
          </li>
          <li v-if="role == 'admin'">
            <i class="bi bi-calendar2-date"></i>
            <router-link :to="{ name: 'all_Timetables' }"
              >Emploi du temps</router-link
            >
          </li>
          <li v-if="role == 'admin'">
            <i class="bi bi-pencil-square"></i>
            <router-link :to="{ name: 'Contrat' }">Contrat</router-link>
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

@import url("../../src/dash/css/color-1.css");
@import url("../../src/dash/css/vendors/font-awesome.css");
@import url("../../src/dash/css/vendors/icofont.css");
@import url("../../src/dash/css/vendors/themify.css");
@import url("../../src/dash/css/vendors/flag-icon.css");

@import url("../../src/dash/css/vendors/feather-icon.css");

@import url("../../src/dash/css/vendors/scrollbar.css");

@import url("../../src/dash/css/vendors/animate.css");

@import url("../../src/dash/css/vendors/date-picker.css");

@import url("../../src/dash/css/vendors/photoswipe.css");


@import url("../../src/dash/css/style.css");

@import url("../../src/dash/css/color-1.css");


@import url("../../src/dash/css/responsive.css");

.liste_liens {
  margin-top: 2em;
  padding:1em;
}
.liste_liens li {
  font-size: 1.3em !important;
  text-align: center;
  margin-bottom: 1.5em;
  position:relative;
  padding-top:1.5em;
  padding-bottom: .5em;
}
.liste_liens li a{
  position: absolute;
  width:100%;
  height:100%;
  left:0;
  top:0;
  color: black;
  padding: .3em;
  
}
.router-link-exact-active {
    background: rgba(5, 34, 73, 0.616) !important;;
  border-radius: 5px;
  color: white !important;
}
.bi{
    left:3.5em;
    top: 0;
    padding: .3em;
}
.liste_liens .bi{
  left:3em;
  top: 0;
  padding: .3em;
  position: absolute;
}

</style>
