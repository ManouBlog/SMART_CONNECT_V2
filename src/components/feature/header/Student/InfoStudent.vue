<script>
import instance from "../../../../api/api";
import LiensNavBar from "../LiensNavBar.vue";
import Swal from "sweetalert2";
import { mapActions } from "pinia";



import { useTranslateStore } from "../../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
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
      texte27:"",
      texte40:"",
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
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
  },
  async created() {
     
    this.texte1 = await this.handleTranslate(`Tableau de bord`);
    this.texte2 = await this.handleTranslate("Mes postulations");
    this.texte3 = await this.handleTranslate('Mes Contrats');
    this.texte40 = await this.handleTranslate('Entreprises intéressées');
    this.texte4 = await this.handleTranslate('Mes disponibilités');
    this.texte5 = await this.handleTranslate('Mes abonnements');
    this.texte6 = await this.handleTranslate('Déconnexion');
   
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
      <!-- <DownOutlined /> -->
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/accueil" class="d-block">
              {{texte1}}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <LiensNavBar :texte="'Mon profil'" :route_lien="'profil'" />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/offre_postule" class="d-block">
              {{texte2}}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/contrat" class="d-block">
              {{texte3}}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/emploi_du_temps" class="d-block">
              {{texte4}}
            </router-link>
          </li>
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/entreprises_interessees" class="d-block">
              {{texte40}}
            </router-link>
          </li>
        </a-menu-item>
        <!-- <a-menu-item>
          <li class="position-absolute deconnex">
            <router-link to="/dashboard/disponibilite" class="d-block">
              Planifier une disponibilité
            </router-link>
          </li>
        </a-menu-item> -->
        <a-menu-item>
          <LiensNavBar
            :texte="texte5"
            :route_lien="'dashboard-abonnements'"
          />
        </a-menu-item>
        <a-menu-item>
          <li class="position-absolute deconnex">
            <a href="#" @click.prevent="deconnexUser" class="fw-bold">{{texte6}}</a>
          </li>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
    <router-link to="/dashboard/accueil"> Tableau de bord </router-link>
  </li>
  <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
    <n-collapse arrow-placement="right">
      <n-collapse-item title="Offres" name="1">
        <router-link to="/dashboard/offre_postule" class="d-block">
          Postulées
        </router-link>
        <router-link to="/dashboard/contrat" class="d-block">
          Contrat
          <span class="alarm-badge" v-if="this.$store.state.contratStudent > 0">
            {{ this.$store.state.contratStudent }}
          </span>
        </router-link>
      </n-collapse-item>
    </n-collapse>
  </li>
  <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
    <n-collapse arrow-placement="right">
      <n-collapse-item title="Calendrier" name="1">
        <router-link to="/dashboard/emploi_du_temps" class="d-block">
          Mes disponibilités
        </router-link>
        <router-link to="/dashboard/disponibilite" class="d-block">
          Enregistrer
        </router-link>
      </n-collapse-item>
    </n-collapse>
  </li> -->
</template>
