<script>
import instance, { lienPhoto } from "../api/api";
import { Help } from "../utils";
import Swal from "sweetalert2";
import { mapState, mapActions } from "pinia";
import { useMenuMobile } from "../store-pinia/MenuMobile/useMenuMobileStore";
// import SelectLanguage from "./feature/header/SelectLanguage.vue";
import LiensNavBar from "./feature/header/LiensNavBar.vue";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
// import MenuMobileEntreprise from "./feature/header/Entreprise/MenuMobileEntreprise";
// import MenuMobileStudent from "./feature/header/Student/MenuMobileStudent.vue";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useNotificationsStore } from "../store-pinia/useNotificationsStore";

export default {
  name: "MenuMobile",
  components: {
    // SelectLanguage,
    // MenuMobileEntreprise,
    // MenuMobileStudent,
    LiensNavBar
  },
  data() {
    return {
      Help: Help,
      lienPhoto: lienPhoto,
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      photo_profil: "",
      userInfos:""
    };
  },
  computed: {
    ...mapState(useMenuMobile, ["showMenuMobile"]),
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
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
     ...mapActions(useNotificationsStore, ["getListNotification"]),
    async deconnexUser() {
      this.launchLoading(true);
      await instance
        .get("auth_logout")
        .then((response) => {
         
          if (response.data.status) {
            
            this.$store.state.user = null;
            this.$store.state.token = null;
        
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.changeValueForshowMenuMobile();

            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.$router.replace("/");
            this.launchLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === "Unauthenticated.") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.replace("/");
          }
          this.launchLoading(false);
        });
    },
    async getInfoUser() {
      if (this.$store.state.token) {
        await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
          
            if (resp.data.status === true) {
              console.log("MYphoto_profil",resp.data.user)
              this.photo_profil = resp.data.user.photo_profil || resp.data.user.logo;
              this.userInfos = resp.data.user
            window.localStorage.setItem("user", JSON.stringify(resp.data.user));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
     async goTo(route) {
      if (!route) return;
      // console.log("lancer1");
      this.changeValueForshowMenuMobile();

      await this.$store.dispatch("getInfoUser");
      const userInfo = this.$store.state.infoUserConnected;
      // console.log("lancer25", userInfo);
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
  },
  async created() {
    this.getInfoUser();
    this.texte = await this.handleTranslate("Connexion");
    this.texte1 = await this.handleTranslate("Accueil");
    this.texte2 = await this.handleTranslate("Offre d'emploi");
    this.texte3 = await this.handleTranslate("Abonnements");
    this.texte4 = await this.handleTranslate("Contactez-nous");
    this.texte6 = await this.handleTranslate("CGU");
    this.texte5 = await this.handleTranslate("Déconnexion");
  },
};
</script>
<template>
  <a-drawer
    v-model:open="showMenuMobile"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    placement="right"
    @close="changeValueForshowMenuMobile"
  >
    <ul>
     
      <li
        v-if="this.$store.state.user"
        style="display: flex; align-items: center; gap: 1em"
      >
        <n-avatar
          v-if="this.photo_profil"
          style="border: 2px solid orange; object-fit: cover"
          round
          :size="55"
          :src="lienPhoto + this.photo_profil"
        />
        <span
          style="
            border: 1px solid white;
            object-fit: cover;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 1em;
            border-radius: 100%;
            background: gray;
            border: 2px solid orange;
          "
          v-else
        >
          <span style="font-size: 1.2em; color: black !important">{{
            Help.toADfirstTwo(this.$store.state.user.nom)
          }}</span>
        </span>
        <span style="color: black !important;text-transform: capitalize;"
          >{{ this.$store.state.user.nom }} 
          {{ this.$store.state.user.prenoms }} 
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin:0.5em 0">
  <span
    v-for="(status,index) in userInfos.user?.statuses"
    :key="index"
    class="badge bg-warning"
  >
    {{ status.statut }}
  </span>
</div>
          </span>
      </li>
      <!-- <SelectLanguage /> -->
      <li v-if="!this.$store.state.user">
        <a href="#" class="login_user_mobile" @click.prevent="changeValueIsModal">
          Connexion
        </a>
      </li>
      <li>
        <router-link
          :to="{ name: 'Bienvenue' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
         Accueil
        </router-link>
      </li>
      <LiensNavBar
      v-if="$store.state.user"
    @click.prevent="changeValueForshowMenuMobile"
    :texte="'Mon tableau de bord'"
    :route_lien="'dash-accueil'"
     />
      <LiensNavBar
      v-if="$store.state.user"
    @click.prevent="changeValueForshowMenuMobile"
    :texte="'Mon compte'"
    :route_lien="'profil'"
     />
    
      <!-- Entreprise et particulier menu -->
       <li  v-if="
    ($store.state.user?.user?.statuses || [])
    .some(s => ['Entreprise', 'Particulier'].includes(s.statut))
    ">
    <router-link
      :to="{ name: 'timetable' }"
      @click.prevent="changeValueForshowMenuMobile"
      class="d-block lien"
    >
      Talents
    </router-link>
    </li>

    <li  v-if="
    ($store.state.user?.user?.statuses || [])
    .some(s => ['Entreprise', 'Particulier'].includes(s.statut))
    ">
    <router-link
      @click.prevent="changeValueForshowMenuMobile"
      to="/dashboard/offre"
      class="d-block"
    >
      Liste des offres
    </router-link>
  </li>
  <li  v-if="
    ($store.state.user?.user?.statuses || [])
    .some(s => ['Entreprise', 'Particulier'].includes(s.statut))
    ">
    <router-link
      @click.prevent="changeValueForshowMenuMobile"
      to="/dashboard/creation_offre"
      class="d-block"
    >
      Créer une offre
    </router-link>
  </li>
   <li  v-if="
    ($store.state.user?.user?.statuses || [])
    .some(s => ['Entreprise', 'Particulier'].includes(s.statut))
    ">
    <router-link
      @click.prevent="changeValueForshowMenuMobile"
      to="/dashboard/personnel"
      class="d-block"
    >
      Talents sélectionnés
     </router-link>
  </li>
  <li  v-if="
    ($store.state.user?.user?.statuses || [])
    .some(s => ['Entreprise', 'Particulier'].includes(s.statut))
    ">
    <router-link
      @click.prevent="changeValueForshowMenuMobile"
      to="/dashboard/postulants"
      class="d-block"
    >
      Postulants
    </router-link>
  </li>


       <!-- Talents(particulier,Professionnel,artisan,Vétéran,etudiant) menu -->

    <li 
    v-if="
  ($store.state.user?.user?.statuses || [])
    .some(s => ['Etudiant', 'Professionnel', 
    'Artisan', 'Vétéran'].includes(s.statut))
"
    class="position-absolute deconnex">
    <a class="d-block" @click="seeMyNotifications">
      Mes Notifications
      <span v-if="unreadNotifications.length > 0" class="badge bg-danger">
        {{ unreadNotifications.length }}
      </span>
    </a>
  </li>
  <li 
  v-if="
  ($store.state.user?.user?.statuses || [])
    .some(s => ['Etudiant', 'Professionnel', 
    'Artisan', 'Vétéran'].includes(s.statut))
"
  class="position-absolute deconnex">
    <a class="d-block" @click="goTo('/dashboard/entreprises_interessees')">
     Entreprises intéressées
    </a>
  </li>
  <li 
  v-if="
  ($store.state.user?.user?.statuses || [])
    .some(s => ['Etudiant', 'Professionnel', 
    'Artisan', 'Vétéran'].includes(s.statut))
"
  class="position-absolute deconnex">
    <a class="d-block" @click="goTo('/dashboard/offre_postule')">
      Mes candidatures
    </a>
  </li>

  <li 
  class="position-absolute deconnex" v-if="$store.state.user && userStatut.some(s=>s.statut == 'Etudiant') ">
    <a class="d-block" @click="goTo('/dashboard/emploi_du_temps')">
      Mes disponibilités
    </a>
  </li>
      <li
        v-if="
  ($store.state.user?.user?.statuses || [])
    .some(s => ['Etudiant', 'Professionnel', 
    'Artisan', 'Vétéran'].includes(s.statut))
">
        <router-link
          :to="{ name: 'jobs' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          Offre d'emploi
        </router-link>
      </li>


       <LiensNavBar
       v-if="$store.state.user"
    @click.prevent="changeValueForshowMenuMobile"
    :texte="`Mes abonnements`"
    :route_lien="'dashboard-abonnements'"
    />
      <li>
        <router-link
          :to="{ name: 'abonnements' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          {{$store.state.user ? 'Formule d\'abonnement' : 'Abonnements'}}
        </router-link>
      </li>
       <li class="position-absolute" v-if="$store.state.user">
    <router-link @click.prevent="changeValueForshowMenuMobile" 
    to="/avis" class="d-block">
      Votre avis
    </router-link>
  </li>
      <li>
        <router-link
          :to="{ name: 'contact' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          Contactez-nous
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'politiques' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          CGU
        </router-link>
      </li>
      
      <li v-if="this.$store.state.user">
        <a href="#" @click="deconnexUser" class="fw-bold"> Déconnexion</a>
      </li>
    </ul>
  </a-drawer>
</template>
<style scoped>
ul li {
  padding: 1em;

  list-style-type: none;
}
ul li a {
  font-weight: bold;
  color: black;
}
</style>
