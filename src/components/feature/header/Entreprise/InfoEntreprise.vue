<script>
import instance from "../../../../api/api";
import Swal from "sweetalert2";
import LiensNavBar from "../../../feature/header/LiensNavBar.vue";
import { mapActions } from "pinia";
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
      data: null,
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
    deconnexUser() {
      this.launchLoading(true);
      instance
        .get("auth_logout")
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log("RESPONSE", response.data);
            this.$store.state.user = null;
            this.$store.state.token = null;
            console.log("this.$store.state.user", this.$store.state.user);
            console.log("this.$store.state.token", this.$store.state.token);
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
          console.log(err);
          this.launchLoading(false);
        });
    },
  },
};
</script>
<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      {{ this.$store.state.user.nom }}
      <em
        v-if="this.$store.state.user"
        class="bi bi-person-workspace text-primary h3 compte_sup"
      ></em>
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <LiensNavBar :texte="'Mon profil'" :route_lien="'profil'" />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/offre" class="d-block">
              Liste des offres
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/creation_offre" class="d-block">
              Créer une offre
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/personnel" class="d-block">
              Personnels
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/postulants" class="d-block">
              Postulants
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <LiensNavBar :texte="`Mes abonnements`" :route_lien="'dashboard-abonnements'" />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <a href="#" @click.prevent="deconnexUser" class="fw-bold"> Déconnexion</a>
          </li>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
