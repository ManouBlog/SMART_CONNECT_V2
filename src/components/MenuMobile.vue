<script>
import instance from "../api/api";
import Swal from "sweetalert2";
import { mapState, mapActions } from "pinia";
import { useMenuMobile } from "../store-pinia/MenuMobile/useMenuMobileStore";
import SelectLanguage from "./feature/header/SelectLanguage.vue";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
import MenuMobileEntreprise from "./feature/header/Entreprise/MenuMobileEntreprise";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";

export default {
  name: "MenuMobile",
  components: {
    SelectLanguage,
    MenuMobileEntreprise,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useMenuMobile, ["showMenuMobile"]),
  },
  methods: {
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    async deconnexUser() {
      this.launchLoading(true);
      await instance
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
            this.changeValueForshowMenuMobile();

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
          Swal.fire({
            icon: "info",
            title: err,
            showConfirmButton: false,
            timer: 1500,
          });
          this.launchLoading(false);
        });
    },
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
      <li style="display: flex; justify-content: space-between; gap: 1em">
        <a href="#" v-if="this.$store.state.user">
          {{ this.$store.state.user.nom }}
          <em class="bi bi-person-workspace text-primary h3"></em>
          <DownOutlined />
        </a>
        <SelectLanguage />
      </li>
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
      <MenuMobileEntreprise
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user.statut.statut === 'entreprise'
        "
      />
      <li
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user.statut.statut === 'etudiant'
        "
      >
        <router-link
          :to="{ name: 'jobs' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          Offre d'emploi
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'abonnements' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          Abonnements
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
