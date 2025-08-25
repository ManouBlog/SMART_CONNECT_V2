<script>
import instance from "../api/api";
import Swal from "sweetalert2";
import { mapState, mapActions } from "pinia";
import { useMenuMobile } from "../store-pinia/MenuMobile/useMenuMobileStore";
// import SelectLanguage from "./feature/header/SelectLanguage.vue";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
import MenuMobileEntreprise from "./feature/header/Entreprise/MenuMobileEntreprise";
import MenuMobileStudent from "./feature/header/Student/MenuMobileStudent.vue";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";

export default {
  name: "MenuMobile",
  components: {
    // SelectLanguage,
    MenuMobileEntreprise,
    MenuMobileStudent,
  },
  data() {
    return {
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
    };
  },
  computed: {
    ...mapState(useMenuMobile, ["showMenuMobile"]),
  },
  methods: {
    ...mapActions(useMenuMobile, ["changeValueForshowMenuMobile"]),
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    async deconnexUser() {
      this.launchLoading(true);
      await instance
        .get("auth_logout")
        .then((response) => {
          // // console.log(response);
          if (response.data.status) {
            // // console.log("RESPONSE", response.data);
            this.$store.state.user = null;
            this.$store.state.token = null;
            // // console.log("this.$store.state.user", this.$store.state.user);
            // // console.log("this.$store.state.token", this.$store.state.token);
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
          console.log(err)
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
  async created() {
    this.texte = await this.handleTranslate("Connexion");
    this.texte1 = await this.handleTranslate("Accueil");
    this.texte2 = await this.handleTranslate("Offre d'emploi");
    this.texte3 = await this.handleTranslate("Abonnement");
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
      <li style="display: flex; justify-content: space-between; gap: 1em">
        <a style="text-transform:capitalize" href="#" v-if="this.$store.state.user">
          {{ this.$store.state.user.nom }}
          <em class="bi bi-person-workspace text-primary h3"></em>
          <!-- <DownOutlined /> -->
        </a>
        <!-- <SelectLanguage /> -->
      </li>
      <li v-if="!this.$store.state.user">
        <a href="#" class="login_user_mobile" @click.prevent="changeValueIsModal">
          {{ texte }}
        </a>
      </li>
      <li>
        <router-link
          :to="{ name: 'Bienvenue' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          {{ texte1 }}
        </router-link>
      </li>
      <MenuMobileEntreprise
        v-if="
          this.$store.state.user &&
          (this.$store.state.user.user.statut.statut === 'entreprise' 
          || this.$store.state.user.user.statut.statut === 'particulier')
        "
      />
      <MenuMobileStudent
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user.statut.statut === 'etudiant'
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
          {{ texte2 }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'abonnements' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          {{ texte3 }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'contact' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          {{ texte4 }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'politiques' }"
          @click.prevent="changeValueForshowMenuMobile"
          class="d-block lien"
        >
          {{ texte6 }}
        </router-link>
      </li>
      <li v-if="this.$store.state.user">
        <a href="#" @click="deconnexUser" class="fw-bold"> {{ texte5 }}</a>
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
