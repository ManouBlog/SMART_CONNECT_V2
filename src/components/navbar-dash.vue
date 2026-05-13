<script>
/* eslint-disable */
import BadgeCompVue from "./BadgeComp.vue";
import axios from 'axios';
export default {
  name: "NavbarDash",
  components: {
    BadgeCompVue,
  },
  data() {
    return {
      user: this.$store.state.user,
      statut: this.$store.state.user?.statuses,
    };
  },
  methods: {
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
    seeNewContrat(){
      this.$store.commit('TOOGLESPINNER',true)
      axios
        .get("https://backend.monbrobroli.com/api/admin/updateBadgeContrat", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log('get_contrat',res)
          if(res.data.status){
        this.get_Contrat();
          } 
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          this.$store.commit('TOOGLESPINNER',false)
        })
    }
   
  },
  created() {
    console.log("userSeeMenuBar213",this.$store.state )
    if(this.$store.state.user?.permissions.some(p => p.name === 'Utilisateurs')){
this.get_users();
    }
    if(this.$store.state.user?.permissions.some(p => p.name === 'Etudiants')){
this.get_Students();
    }

    if(this.$store.state.user?.permissions.some(p => p.name === 'Contrat')){
this.get_Contrat();
    }
    
    this.$store.dispatch("getInfoUser");
  },
};
</script>
<template>
     <!-- <p>{{ $store.state.user?.permissions }}</p> -->
  <div class="sidebar-wrapper" style="overflow: auto">
    <div style="background: var(--theme-deafult);min-height:100vh;">
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
          <li style="display: flex; align-items: center; gap: 0.1em; color: white"
          v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Dashboard')"
          >
            <i class="bi bi-house-door position-absolute" style="margin-left: -1.2em"></i
            ><router-link :to="{ name: 'Accueil' }">
              <strong>Tableau de bord</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Domaines')"
          >
            <i class="bi bi-grid-1x2" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Categorie' }"
              ><strong> Domaines </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Poste')"
          >
            <i class="bi bi-grid-1x2" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Competences' }"
              ><strong> Postes </strong>
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Utilisateurs')"
          >
            <i class="bi bi-people" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'users' }">
              <strong> Utilisateurs </strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Entreprises')"
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
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Etudiants')"
          >
            <i class="bi bi-person" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'students' }">
              <strong>Talents</strong>
              <BadgeCompVue
                v-if="(this.$store.state.listStudentAbonne+this.$store.state.listStudentPasAbonne) > 0"
                :nbreTotal="this.$store.state.listStudentAbonne+this.$store.state.listStudentPasAbonne"
              />
              </router-link
            >
            
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Messages')"
          >
            <i class="bi bi-envelope-paper" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'newsletter' }">
              <strong>Messages</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Offres')"
          >
            <i class="bi bi-briefcase" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'all_Offres' }">
              <strong>Offres</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
           v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Contrat')"
            @click.prevent="seeNewContrat"
          >
            <i class="bi bi-pencil-square" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'Contrat' }"> <strong>Contrat</strong>
            <BadgeCompVue
                v-if="this.$store.state.nbreBadgeContrat > 0"
                :nbreTotal="this.$store.state.nbreBadgeContrat"
              />
            </router-link>
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
           v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Abonnements')"
          >
            <i class="bi bi-credit-card-2-back" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'abonnement' }">
              <strong>Abonnements</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
             v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Paiements')"
          >
            <i class="bi bi-cash-stack" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'transactions' }">
              <strong>Historique de paiement</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
             v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Temoignages')"
          >
            <i class="bi bi-chat-quote" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'temoignages' }">
              <strong>Témoignages</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
             v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Partenaires')"
          >
            <i class="bi bi-people-fill" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'partenaires' }">
              <strong>Partenaires</strong></router-link
            >
          </li>
          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
             v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Publicités')"
          >
            <i class="bi bi-card-image" style="margin-left: -1.2em"></i>
            <router-link :to="{ name: 'publicite' }">
              <strong>Publicité</strong></router-link
            >
          </li>

          <li
            style="display: flex; align-items: center; gap: 0.1em; color: white"
            v-if="$store.state.user?.permissions && $store.state.user?.permissions?.some(p => p.name === 'Date_lancement')"
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
