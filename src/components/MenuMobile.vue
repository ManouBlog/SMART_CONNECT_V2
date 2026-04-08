<script>
import instance, { lienPhoto } from "../api/api";
import { Help } from "../utils";
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
              this.photo_profil = resp.data.user.photo_profil;
            
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
        <span style="color: black !important"
          >{{ this.$store.state.user.nom }} 
          <i class="bi bi-patch-check-fill" 
          v-if="this.$store?.state?.user?.user?.is_verified"
          style="color:rgb(0, 171, 251);font-size: 1em !important;"></i> 
          <br />
          {{ this.$store.state.user.prenoms }} 
          <br />
          <span class="badge bg-warning">
            {{ this.$store.state.user.user?.statut?.statut }}</span>
          </span
        >
      </li>
      <!-- <SelectLanguage /> -->
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
          (this.$store.state.user.user.statut.statut === 'entreprise' ||
            this.$store.state.user.user.statut.statut === 'particulier')
        "
      />
      <MenuMobileStudent
        v-if="
  this.$store.state.user &&
  [
    'etudiant',
    'professionnel',
    'artisan',
    'veteran'
  ].includes(this.$store.state.user.user.statut.statut)
"
      />
      <li
           v-if="
  this.$store.state.user &&
  ( this.$store.state.user.user.statut.statut === 'etudiant' ||
    this.$store.state.user.user.statut.statut === 'professionnel' ||
    this.$store.state.user.user.statut.statut === 'artisan' ||
    this.$store.state.user.user.statut.statut === 'veteran')
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
