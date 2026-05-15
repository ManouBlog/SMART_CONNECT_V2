<script>
import instance, { lienPhoto } from "../../../api/api";
import LiensNavBar from "./LiensNavBar.vue";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import { Help } from "../../../utils";
import { useMenuMobile } from "../../../store-pinia/MenuMobile/useMenuMobileStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "InfoStudent",
  components: {
    LiensNavBar,
  },
  props: {
    texte: String,
    route_lien: String,
    statut_user: String,
    isNeedConnection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lienPhoto: lienPhoto,
      Help: Help,
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
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27: "",
      texte40: "",
      data: null,
      user: null,
      texte30 :"",
      texte50 :"" 
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
    chooseLangue() {
      return this.chooseConteneurLanguage;
    },
  },
  methods: {
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    deconnexUser() {
      this.launchLoading(true);
      instance
        .get("auth_logout")
        .then((response) => {
          
          if (response.data.status) {
            this.$store.dispatch("deleteStateUser")
            this.$store.commit("UPDATE_INFO_COMPANY", null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
        
        })
        .finally(()=>{
           this.launchLoading(false);
        })
    },
    async getInfoUser() {
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
     
          if (resp.data.status === true) {
            this.user = resp.data.user;
            window.localStorage.setItem("user", JSON.stringify(resp.data.user));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async created() {
    await this.getInfoUser();
    this.texte1 = await this.handleTranslate(`Tableau de bord`);
    this.texte2 = await this.handleTranslate("Mes candidatures");
    this.texte40 = await this.handleTranslate("Entreprises intéressées");
    this.texte4 = await this.handleTranslate("Mes disponibilités");
    this.texte5 = await this.handleTranslate("Mes abonnements");
    this.texte6 = await this.handleTranslate("Déconnexion");
    this.texte20 = await this.handleTranslate("Liste des offres");
    this.texte30 = await this.handleTranslate("Créer une offre");
    this.texte24 = await this.handleTranslate("Mes talents");
    this.texte50 = await this.handleTranslate("Postulants");
   
  },
};
</script>
<template>
  <a-dropdown v-if="user">
    <a
      style="text-transform: capitalize; display: flex; align-items: center; gap: 0.5em"
      class="ant-dropdown-link logo_user"
      @click.prevent
    >
      <n-avatar
        v-if="user.photo_profil"
        style="border: 2px solid orange; object-fit: cover"
        round
        :size="55"
        :src="lienPhoto + user.photo_profil"
      />
      <span
        style="
          border: 1px solid white;
          object-fit: cover;
          width: 65px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 1em;
          border-radius: 100%;
          background: gray;
        "
        v-else
      >
        <span style="font-size: 1em;color: black !important;font-weight: bold;">{{ Help.toADfirstTwo(user.nom) }}</span>
      </span>
      <span style="color: black !important;font-weight: bold;">{{ user.nom }}</span>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/accueil" class="d-block">
              {{ texte1 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <LiensNavBar :texte="'Mon espace'" :route_lien="'profil'" />
        </a-menu-item>
        <a-menu-item v-if="user.user.statuses.some(s=>['Etudiant','Professionnel','Vétéran','Artisan'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/offre_postule" class="d-block">
              {{ texte2 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item v-if="user.user.statuses.some(s=>['Etudiant','Professionnel','Vétéran','Artisan'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/entreprises_interessees" class="d-block">
              {{ texte40 }}
            </router-link>
          </li>
        </a-menu-item>
      
        <a-menu-item v-if="user.user?.statuses.some(s =>['Etudiant'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/emploi_du_temps" class="d-block">
              {{ texte4 }}
            </router-link>
          </li>
        </a-menu-item>

        <a-menu-item v-if="user.user.statuses.some(s=>['Entreprise','Particulier'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/offre" class="d-block">
              {{ this.$store.state.user.user.statut.statut == 'Entreprise' ? texte20:'Liste des missions' }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item v-if="user.user.statuses.some(s=>['Entreprise','Particulier'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/creation_offre" class="d-block">
              {{user.user.statut.statut === 'Entreprise' ? texte30:'Poster une mission' }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item v-if="user.user.statuses.some(s=>['Entreprise','Particulier'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/personnel" class="d-block">
              {{ texte24 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item v-if="user.user.statuses.some(s=>['Entreprise','Particulier'].includes(s.statut))">
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/postulants" class="d-block">
              {{ texte50 }} <span class="badge bg-danger" v-if="dataAlarm">{{dataAlarm}}</span>
            </router-link>
          </li>
        </a-menu-item>

        <a-menu-item>
          <LiensNavBar :texte="texte5" :route_lien="'dashboard-abonnements'" />
        </a-menu-item>
        <a-menu-item>
          <li>
            <router-link to="/avis" class="d-block"> Votre avis </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <a href="#" @click.prevent="deconnexUser" class="fw-bold text-danger">{{ texte6 }}</a>
          </li>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style scoped>
:deep(li) {
  padding: 0.5em;
}

@media (min-width: 1201px) {
  :deep(.ant-dropdown-link) {
    display: none !important;
  }
}
li a {
  font-weight: bold;
  color: black;
}
</style>
