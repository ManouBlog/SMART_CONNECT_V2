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
      statut: this.$store.state.user?.statut?.statut,
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
        .get("https://backend.monbrobroli.com/api/admin/updateBadgeContrat", {
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
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
  },
 
};
</script>

<template>
  <!-- ACCUEIL -->
  <li 
  v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Dashboard')"
  @click="goTo('Accueil')" :class="['nav-item', { active: isActive('Accueil') }]">
    <i class="bi bi-house-door"></i>
    <strong>Tableau de bord</strong>
  </li>

  <slot name="header"></slot>

  <!-- ADMIN -->
  <li
  
     v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Domaines')"
    @click="goTo('Categorie')"
    :class="['nav-item', { active: isActive('Categorie') }]"
  >
    <i class="bi bi-grid-1x2"></i>
    <strong>Domaines</strong>
  </li>

  <li
       v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Poste')"
    @click="goTo('Competences')"
    :class="['nav-item', { active: isActive('Competences') }]"
  >
    <i class="bi bi-grid-1x2"></i>
    <strong>Postes</strong>
  </li>
  <li
      v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Utilisateurs')"
    @click="goTo('users')"
    :class="['nav-item', { active: isActive('users') }]"
  >
    <i class="bi bi-people"></i>
    <strong>Utilisateurs</strong>
  </li>

  <li
      v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Entreprises')"
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
    v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Etudiants')"
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
    v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Messages')"
    @click="goTo('newsletter')"
    :class="['nav-item', { active: isActive('newsletter') }]"
  >
    <i class="bi bi-envelope-paper"></i>
    <strong>Messages</strong>
  </li>

  <li
           v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Offres')"
    @click="goTo('all_Offres')"
    :class="['nav-item', { active: isActive('all_Offres') }]"
  >
    <i class="bi bi-briefcase"></i>
    <strong>Offres</strong>
  </li>

  <li
       v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Contrat')"
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
       v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Abonnements')"
    @click="goTo('abonnement')"
    :class="['nav-item', { active: isActive('abonnement') }]"
  >
    <i class="bi bi-credit-card-2-back"></i>
    <strong>Abonnements</strong>
  </li>

  <li
     v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Paiements')"
    @click="goTo('transactions')"
    :class="['nav-item', { active: isActive('transactions') }]"
  >
    <i class="bi bi-cash-stack"></i>
    <strong>Historique de paiement</strong>
  </li>

  <li
    v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Temoignages')"
    @click="goTo('temoignages')"
    :class="['nav-item', { active: isActive('temoignages') }]"
  >
    <i class="bi bi-chat-quote"></i>
    <strong>Témoignages</strong>
  </li>

  <li
     v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Partenaires')"
    @click="goTo('partenaires')"
    :class="['nav-item', { active: isActive('partenaires') }]"
  >
    <i class="bi bi-people-fill"></i>
    <strong>Partenaires</strong>
  </li>

  <li
         v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Publicités')"
    @click="goTo('publicite')"
    :class="['nav-item', { active: isActive('publicite') }]"
  >
    <i class="bi bi-card-image"></i>
    <strong>Publicité</strong>
  </li>

  <li
       v-if="$store.state.userSeeMenuBar && $store.state.userSeeMenuBar.permissions?.some(p => p.name === 'Date_lancement')"
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
