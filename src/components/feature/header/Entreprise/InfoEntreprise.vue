<script>
import instance from "../../../../api/api";
import Swal from "sweetalert2";
import LiensNavBar from "../../../feature/header/LiensNavBar.vue";
import { mapActions } from "pinia";

import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "InfoEntreprise",
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
      data: null,
      dataAlarm: 0,
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    deconnexUser() {
      this.launchLoading(true);
      instance
        .get("auth_logout")
        .then((response) => {
          // console.log(response);
          if (response.data.status) {
            // console.log("RESPONSE", response.data);
            this.$store.state.user = null;
            this.$store.state.token = null;
            // console.log("this.$store.state.user", this.$store.state.user);
            // console.log("this.$store.state.token", this.$store.state.token);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
            this.launchLoading(false);
          }
        })
        .catch((err) => {
          console.log(err)
          this.launchLoading(false);
        });
    },
    async get_offres_interess_by_student() {
      try {
        const response = await instance.get("list_offres_interess_by_students");
        // console.log(
         // "get_offres_interess_by_student",
         // response.data.filter((item) => item.recruit === 0).length
        //);
        if (response["status"] === 200) {
          this.dataAlarm = response.data.filter((item) => item.recruit === 0).length;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.get_offres_interess_by_student();
    this.texte1 = await this.handleTranslate(`Tableau de bord`);
    this.texte2 = await this.handleTranslate("Liste des offres");
    this.texte3 = await this.handleTranslate("Créer une offre");
    this.texte4 = await this.handleTranslate("Talents");
    this.texte5 = await this.handleTranslate("Postulants");
    this.texte6 = await this.handleTranslate("Mes abonnements");
    this.texte7 = await this.handleTranslate("Déconnexion");
  },
};
</script>
<template>
  <a-dropdown>
    <a style="text-transform:capitalize" class="ant-dropdown-link" @click.prevent>
      {{ this.$store.state.user.nom }}
      <em
        v-if="this.$store.state.user"
        class="bi bi-person-workspace text-primary h3 compte_sup"
      ></em>
      <span v-if="dataAlarm" class="badge bg-danger">{{ dataAlarm }}</span>
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
          <LiensNavBar :texte="$t('Header.Menu.Profil')" :route_lien="'profil'" />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/offre" class="d-block">
              {{ texte2 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/creation_offre" class="d-block">
              {{ texte3 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/personnel" class="d-block">
              {{ texte4 }}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/postulants" class="d-block">
              {{ texte5 }} <span class="badge bg-danger" v-if="dataAlarm">{{dataAlarm}}</span>
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <LiensNavBar :texte="texte6" :route_lien="'dashboard-abonnements'" />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <a href="#" @click.prevent="deconnexUser" class="fw-bold">{{ texte7 }}</a>
          </li>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
