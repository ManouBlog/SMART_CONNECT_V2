<script>
/* eslint-disable */
import BadgeCompVue from "./BadgeComp.vue";
import axios from "axios";

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
    goTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
    isActive(routeName) {
      // Gère aussi les sous-routes
      return this.$route.matched.some((r) => r.name === routeName);
    },
    get_users() {
      this.$store.dispatch("get_users");
    },
    get_Students() {
      this.$store.dispatch("get_Students_abonne");
      this.$store.dispatch("get_Students_Non_Abonne");
    },
    get_Contrat() {
      this.$store.dispatch("get_contrats");
    },
    seeNewContrat() {
      this.$store.commit("TOOGLESPINNER", true);
      axios
        .get("http://backend.monbrobroli.com/api/admin/updateBadgeContrat", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_contrat", res);
          if (res.data.status) {
            this.get_Contrat();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
  },
  // created() {
  //   this.get_users();
  //   this.get_Students();
  //   this.get_Contrat();
  // },
};
</script>

<template>
  <!-- ACCUEIL -->
  <li @click="goTo('Accueil')" :class="['nav-item', { active: isActive('Accueil') }]">
    <i class="bi bi-house-door"></i>
    <strong>Tableau de bord</strong>
  </li>

  <slot name="header"></slot>

  <!-- ADMIN -->
  <li
    v-if="statut === 'admin'"
    @click="goTo('Categorie')"
    :class="['nav-item', { active: isActive('Categorie') }]"
  >
    <i class="bi bi-grid-1x2"></i>
    <strong>Domaines</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('Competences')"
    :class="['nav-item', { active: isActive('Competences') }]"
  >
    <i class="bi bi-grid-1x2"></i>
    <strong>Postes</strong>
  </li>

  <!-- ENTREPRISE -->
  <li
    v-if="statut === 'entreprise'"
    @click="goTo('offres')"
    :class="['nav-item', { active: isActive('offres') }]"
  >
    <i class="bi bi-briefcase"></i>
    <strong>Mes offres</strong>
  </li>

  <li
    v-if="statut === 'entreprise'"
    @click="goTo('student_contacts_by_entreprise')"
    :class="['nav-item', { active: isActive('student_contacts_by_entreprise') }]"
  >
    <i class="bi bi-people"></i>
    <strong>Personnels contactés</strong>
  </li>

  <li
    v-if="statut === 'entreprise'"
    @click="goTo('OffreInteressByStudents')"
    :class="['nav-item', { active: isActive('OffreInteressByStudents') }]"
  >
    <i class="bi bi-people"></i>
    <strong>Postulants à mon offre</strong>
  </li>

  <!-- ETUDIANT -->
  <li
    v-if="statut === 'etudiant'"
    @click="goTo('create_timetable')"
    :class="['nav-item', { active: isActive('create_timetable') }]"
  >
    <i class="bi bi-calendar-date"></i>
    <strong>Mon calendrier</strong>
  </li>

  <li
    v-if="statut === 'etudiant'"
    @click="goTo('see_offres_postuler')"
    :class="['nav-item', { active: isActive('see_offres_postuler') }]"
  >
    <i class="bi bi-briefcase"></i>
    <strong>Offres postulées</strong>
  </li>

  <li
    v-if="statut === 'etudiant'"
    @click="goTo('see_who_interesse_by_profil_student')"
    :class="['nav-item', { active: isActive('see_who_interesse_by_profil_student') }]"
  >
    <i class="bi bi-building"></i>
    <strong>Contrat-entreprises</strong>
  </li>

  <!-- ADMIN AVANCÉ -->
  <!-- <li
    v-if="statut === 'admin'"
    @click="goTo('users_beta')"
    :class="['nav-item', { active: isActive('users_beta') }]"
  >
    <i class="bi bi-people"></i>
    <strong>Utilisateurs bêta</strong>
  </li> -->

  <li
    v-if="statut === 'admin'"
    @click="goTo('users')"
    :class="['nav-item', { active: isActive('users') }]"
  >
    <i class="bi bi-people"></i>
    <strong>Utilisateurs</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('entreprises')"
    :class="['nav-item', { active: isActive('entreprises') }]"
  >
    <i class="bi bi-building"></i>
    <strong>Entreprises</strong>

    <BadgeCompVue
      v-if="$store.state.nbreBadgeEntreprise > 0"
      :nbreTotal="$store.state.nbreBadgeEntreprise"
    />
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('students')"
    :class="['nav-item', { active: isActive('students') }]"
  >
    <i class="bi bi-person"></i>
    <strong>Étudiants</strong>
    <BadgeCompVue
      v-if="
        this.$store.state.listStudentAbonne + this.$store.state.listStudentPasAbonne > 0
      "
      :nbreTotal="
        this.$store.state.listStudentAbonne + this.$store.state.listStudentPasAbonne
      "
    />
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('newsletter')"
    :class="['nav-item', { active: isActive('newsletter') }]"
  >
    <i class="bi bi-envelope-paper"></i>
    <strong>Messages</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('all_Offres')"
    :class="['nav-item', { active: isActive('all_Offres') }]"
  >
    <i class="bi bi-briefcase"></i>
    <strong>Offres</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('Contrat')"
    :class="['nav-item', { active: isActive('Contrat') }]"
  >
    <i class="bi bi-pencil-square"></i>
    <strong>Contrat</strong>
    <BadgeCompVue
      v-if="this.$store.state.nbreBadgeContrat > 0"
      :nbreTotal="this.$store.state.nbreBadgeContrat"
    />
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('abonnement')"
    :class="['nav-item', { active: isActive('abonnement') }]"
  >
    <i class="bi bi-credit-card-2-back"></i>
    <strong>Abonnements</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('transactions')"
    :class="['nav-item', { active: isActive('transactions') }]"
  >
    <i class="bi bi-cash-stack"></i>
    <strong>Historique de paiement</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('temoignages')"
    :class="['nav-item', { active: isActive('temoignages') }]"
  >
    <i class="bi bi-chat-quote"></i>
    <strong>Témoignages</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('partenaires')"
    :class="['nav-item', { active: isActive('partenaires') }]"
  >
    <i class="bi bi-people-fill"></i>
    <strong>Partenaires</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('publicite')"
    :class="['nav-item', { active: isActive('publicite') }]"
  >
    <i class="bi bi-card-image"></i>
    <strong>Publicité</strong>
  </li>

  <li
    v-if="statut === 'admin'"
    @click="goTo('date_lancement')"
    :class="['nav-item', { active: isActive('date_lancement') }]"
  >
    <i class="bi bi-calendar"></i>
    <strong>Date de lancement</strong>
  </li>

  <slot name="footer"></slot>
</template>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 6px;
}

.nav-item:hover {
  background-color: rgba(255, 145, 0, 0.892);
}

.nav-item.active {
  background-color: rgba(255, 145, 0, 0.892);
  color: white;
  font-weight: 600;
}

.nav-item.active i {
  color: white;
}

.nav-item i {
  font-size: 1.1rem;
}
.page-wrapper .page-header .header-wrapper .nav-right > ul > li .badge {
  top: 0 !important;
  color: white !important;
}
</style>
