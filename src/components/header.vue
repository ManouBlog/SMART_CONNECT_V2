<script>
import instance from "../api/api";
import Swal from "sweetalert2";
import "@kong/kongponents/dist/style.css";
import SelectLanguage from "./feature/header/SelectLanguage.vue";
import LiensNavBar from "./feature/header/LiensNavBar.vue";
import InfoEntreprise from "./feature/header/Entreprise/InfoEntreprise.vue";
import InfoStudent from "./feature/header/Student/InfoStudent.vue";
import ListeFavoris from "./feature/header/ListeFavoris.vue";
import { mapActions } from "pinia";
import { useRegisterStore } from "../store-pinia/register/useRegisterStore";
export default {
  name: "Header",
  components: {
    SelectLanguage,
    LiensNavBar,
    InfoEntreprise,
    InfoStudent,
    ListeFavoris,
  },
  data() {
    return {
      datesPickers: [],
      selecteDatepickers: {},
      days: [],
      profile: false,

      details_timetable: false,
      NewListEmploi: [],
      timetable_for_student: "",
      showLoader: false,
      schedule: "",
      dateDebut: null,
      dateFin: null,
      checkboxDate: false,
      checkbox: false,
      option: "",
      selectedCompetenceWithDate: "",
      selectedService: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
      perPage: 3,
      currentPage: 1,
      totalPages: "",
      maxVisibleButtons: "2",
      selectedCompetenceWithPeriode: "",
      profileSub: false,
    };
  },
  computed: {
    paginatedData() {
      let start = this.currentPage * this.perPage - this.perPage;
      let end = start + this.perPage;
      return this.timetable_for_student.etoiles.slice(start, end);
    },
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages)
        return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons - 1);
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({ number: i, isDisabled: i === this.currentPage });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    attributes() {
      return [
        ...this.schedule.map((time) => ({
          dates: new Date(time.jour),
          highlight: {
            color: time.job == 3 ? "gray" : time.job == 1 ? "red" : "green",
            fillMode: time.job == 3 ? "light" : "solid",
          },
          popover: {
            label: {
              one: time.First_horaire,
              two: time.Second_horaire,
            },
            visibility: "hover",
          },
        })),
      ];
    },
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    selectLanguageForWeb(e) {
      // this.$store.commit("CHANGE_LANGAGE_WEB", e.target.value);
      console.log();
      this.$i18n.locale = e.target.value;
      // console.log("e.target.value.toUpperCase()",e.target.value.toLowerCase())
      // const element = useChangeLanguageStore();
      // element.changeLocaleDefaultLanguage(e.target.value.toLowerCase())
    },
    deletePersonAtWishList(person) {
      this.$store.commit("addPersonAtWishLit", person);
    },
    all() {
      this.$store.commit("getall");
    },

    deconnexUser() {
      this.showLoader = true;
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
            this.profile = false;
            this.showLoader = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // voirDetailTimetable(id) {
    //   if (
    //     (this.$store.state.user &&
    //       this.$store.state.user.user.statut.statut == "entreprise") ||
    //     (this.$store.state.user &&
    //       this.$store.state.user.user.statut.statut === "particulier")
    //   ) {
    //     this.details_timetable = !this.details_timetable;
    //     this.id_detail_timetable = id;
    //     this.loadSpinner = true;
    //     instance
    //       .get("FiltreTimetable")
    //       .then(async (res) => {
    //         console.log(res);
    //         this.NewListEmploi = await res.data.data;
    //         this.dateRendezVousStudentWithEntreprise = res.data.date;
    //         let dateOfStudent = [];
    //         this.dateRendezVousStudentWithEntreprise.forEach((element) => {
    //           if (element.student_id === id) {
    //             dateOfStudent.push(element);
    //           }
    //         });

    //         this.MyDateRendezVous = dateOfStudent;
    //         this.timetable_for_student = this.NewListEmploi.find(
    //           (item) => item.id === id
    //         );
    //         this.totalPages = Math.ceil(this.timetable_for_student.etoiles.length / 2);

    //         this.schedule = this.timetable_for_student.jours;

    //         this.schedule.forEach((item) => {
    //           console.log("DATE", this.MyDateRendezVous);
    //           this.MyDateRendezVous.forEach((date) => {
    //             if (
    //               item.jour === date.date_debut ||
    //               item.jour === date.date_fin ||
    //               item.jour === date.date ||
    //               (item.jour > date.date_debut && item.jour < date.date_fin)
    //             ) {
    //               if (date.contrat === 1) item.job = 1;
    //             }
    //           });
    //           item.jou = new Date(item.jour).getDate();
    //           item.month = new Date(item.jour).getMonth() + 1;
    //           item.year = new Date(item.jour).getFullYear();
    //           console.log(JSON.stringify(new Date().toISOString().slice(0, 10)));
    //           if (
    //             JSON.stringify(new Date(item.jour)) <
    //             JSON.stringify(new Date().toISOString().slice(0, 10))
    //           ) {
    //             item.job = 3;
    //           }
    //         });
    //         this.selectedService = this.timetable_for_student.competences;
    //         console.log("COMPETENCES", this.selectedService);

    //         this.loadSpinner = false;
    //         console.log("EMPLOI DU TEMPS", this.timetable_for_student);

    //         console.log("TIMETBALE", this.schedule);
    //         console.log("DateRendez-vous", this.MyDateRendezVous);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     Swal.fire({
    //       icon: "info",
    //       title: "Veuillez-vous connecter!",
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
    //     setTimeout(() => {
    //       this.$router.push({
    //         path: "/registre",
    //         query: { redirect: this.path },
    //       });
    //     }, 2000);
    //   }
    // },
    closeDetailTimetable() {
      this.details_timetable = !this.details_timetable;
      this.id_detail_timetable = "";
    },
    contacter_me(id) {
      if (this.dateDebut != null && this.dateFin != null) {
        if (new Date(this.dateDebut) < new Date(this.dateFin)) {
          instance
            .post("entreprise_student", {
              student_id: id,
              dateDebut_contrat: this.dateDebut,
              dateFin_contrat: this.dateFin,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status === true) {
                Swal.fire({
                  icon: "success",
                  title: res.data.message,
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
              if (res.data.status === false) {
                Swal.fire({
                  icon: "error",
                  title: res.data.message,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Veuillez-vous connecter",
                showConfirmButton: true,
              });
              setTimeout(() => {
                this.$router.push("/registre");
              }, 1500);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Vérifier les dates.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
      if (this.dateDebut == null && this.dateFin == null) {
        Swal.fire({
          icon: "error",
          title: "Veuillez renseigner les dates concernant le contrat.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  created() {
    this.all();
  },
};
</script>

<template>
  <section>
    <div id="header" class="container-fluid home">
      <div class="row">
        <div class="top_header">
          <nav class="navbar navbar-fixed-top">
            <div class="container conteneur-flex_nav">
              <div class="logo">
                <img class="img-fluid w-100" src="../assets/lce.png" alt="Photo" />
              </div>
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>

              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav_lien_nav_bar">
                  <LiensNavBar :texte="'Accueil'" :route_lien="'Bienvenue'" />

                  <LiensNavBar
                    v-if="
                      this.$store.state.user &&
                      this.$store.state.user.user.statut.statut === 'etudiant'
                    "
                    :texte="`Offre d'emploi`"
                    :route_lien="'jobs'"
                    :statut_user="'etudiant'"
                    :isNeedConnection="true"
                  />
                  <LiensNavBar
                    v-if="
                      this.$store.state.user &&
                      this.$store.state.user.user.statut.statut === 'entreprise'
                    "
                    :texte="`Talents`"
                    :route_lien="'timetable'"
                    :statut_user="'entreprise'"
                    :isNeedConnection="true"
                  />
                  <LiensNavBar :texte="`Abonnements`" :route_lien="'abonnements'" />
                  <LiensNavBar :texte="`Contactez-nous`" :route_lien="'contact'" />
                  <li>
                    <SelectLanguage />
                  </li>
                  <li
                    v-if="
                      this.$store.state.user &&
                      this.$store.state.user.user.statut.statut === 'etudiant'
                    "
                  >
                    <router-link class="lien position-relative" :to="{ name: 'contrat' }">
                      <div class="alarme_red" v-if="this.$store.state.contratStudent > 0">
                        {{ this.$store.state.contratStudent }}
                      </div>
                      <i class="bi bi-bell-fill"></i>
                    </router-link>
                  </li>
                </ul>

                <div class="position-relative">
                  <a
                    href="#"
                    v-if="this.$store.state.user"
                    class="text-primary h3 sub_compte"
                    @click.prevent="profileSub = !profileSub"
                    >{{ this.$store.state.user.nom }}</a
                  >
                  <em
                    v-if="this.$store.state.user"
                    @click.prevent="profileSub = !profileSub"
                    class="bi bi-person-workspace text-primary h3 p-5 compteSub"
                  ></em>
                  <em
                    class="bi bi-caret-down-fill compteSub"
                    v-if="this.$store.state.user"
                    :class="profile == true ? 'd-none' : ''"
                  ></em>
                  <em
                    class="bi bi-caret-up-fill compteSub"
                    v-if="this.$store.state.user && profile == true"
                  ></em>
                  <div
                    v-if="this.$store.state.user"
                    class="compte compteSub"
                    v-show="profileSub"
                  >
                    <ul class="list_profit_user">
                      <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
                        <router-link to="/dashboard/accueil">
                          Tableau de bord
                        </router-link>
                      </li>
                      <li v-if="this.$store.state.user.user.statut.statut == 'etudiant'">
                        <n-collapse arrow-placement="right">
                          <n-collapse-item title="Offres" name="1">
                            <router-link to="/dashboard/offre_postule" class="d-block">
                              Postulées
                            </router-link>
                            <router-link to="/dashboard/contrat" class="d-block">
                              Contrat
                              <span
                                class="badge bg-danger"
                                v-if="this.$store.state.contratStudent > 0"
                              >
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
                              Liste
                            </router-link>
                            <router-link to="/dashboard/disponibilite" class="d-block">
                              Enregistrer
                            </router-link>
                          </n-collapse-item>
                        </n-collapse>
                      </li>
                      <li
                        v-if="this.$store.state.user.user.statut.statut == 'entreprise'"
                      >
                        <n-collapse arrow-placement="right">
                          <n-collapse-item title="Offre" name="1">
                            <router-link to="/dashboard/offre" class="d-block">
                              Liste
                            </router-link>
                            <router-link to="/dashboard/creation_offre" class="d-block">
                              Enregistrer
                            </router-link>
                          </n-collapse-item>
                        </n-collapse>
                      </li>
                      <li
                        v-if="this.$store.state.user.user.statut.statut == 'entreprise'"
                      >
                        <router-link to="/dashboard/personnel" class="d-block">
                          Personnels
                        </router-link>
                      </li>
                      <li
                        v-if="this.$store.state.user.user.statut.statut == 'entreprise'"
                      >
                        <router-link to="/dashboard/postulants" class="d-block">
                          Postulants
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/dashboard/profil" class="d-block">
                          Mon profil
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/dashboard/abonnements" class="d-block">
                          Mes abonnements
                        </router-link>
                      </li>

                      <li class="position-absolute deconnex">
                        <a href="#" @click.prevent="deconnexUser" class="fw-bold">
                          Déconnexion</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>

                <router-link
                  v-if="!this.$store.state.user"
                  to="/registre"
                  class="loginSub"
                >
                  se connecter
                </router-link>
              </div>

              <div class="conteneur-favoris-name_user">
                <a
                  href="#"
                  v-if="!this.$store.state.user"
                  class="login_user mx-3"
                  @click.prevent="changeValueIsModal"
                >
                  Connexion
                </a>
                <ListeFavoris v-if="this.$store.state.user" />
                <div>
                  <InfoEntreprise
                    v-if="
                      this.$store.state.user &&
                      this.$store.state.user.user.statut.statut === 'entreprise'
                    "
                  />

                  <InfoStudent
                    v-if="
                      this.$store.state.user &&
                      this.$store.state.user.user.statut.statut === 'etudiant'
                    "
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.ant-dropdown-link {
  font-size: 1.2em;
}
.loginSub {
  font-size: 2em;
}

.conteneur-favoris-name_user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.8em;
}
.conteneur-flex_nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
}
.nav_lien_nav_bar {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 0;
}
.nav_lien_nav_bar li {
  list-style-type: none;
}
.alarm-badge {
  width: auto;
  height: auto;
  padding: 0.1em 0.6em;
  background: red;
  border-radius: 50%;
  color: white;
  font-weight: bold;
}
.alarme_red {
  width: auto;
  height: auto;
  padding: 0.1em 0.6em;
  background: red;
  border-radius: 50%;
  right: 1.3em;
  color: white;
  font-weight: bold;
  top: 0;
  position: absolute;
}
.bi-bell-fill {
  font-size: 1.8em !important;
  font-weight: bold !important;
}
.form-translate {
  position: absolute;
  right: 0.5em;
  font-weight: bold;
  padding: 0.3em;
}

.bi-caret-down-fill,
.bi-caret-up-fill {
  font-size: 0.5em;
  margin-top: 0.5em;
}

.circle_icon::before {
  font-size: 2em;
}

.conteneur_timetable {
  padding: 1em;
}
.flex-periode {
  flex-direction: column;
}
.pagination_btn {
  margin: 0 0.1em;
  border: 1px solid teal;
  background: transparent;
  border-radius: 5px;
}
.color {
  border: 1px solid white;
  background: #f77f00 !important;
}
.bi-person {
  font-size: 3em !important;
}
.selecte_service select {
  width: 30%;
  margin: 0.5em 0;
  border-radius: 5px;
  padding: 0.3em 0;
}
.vue3-star-ratings__wrapper[data-v-76dea496] {
  display: block;
  margin: 15px auto;
  text-align: center;
  padding: 2px;
}
.conteneur_competences {
  margin-left: 1em;
  margin-top: 0.5em;
}
.hideschudleIfUserStudent .student {
  width: 50%;
  background: white;
  height: auto;
  overflow-y: auto;
  border-radius: 10px;
}
.bs {
  font-size: 3em !important;
  color: crimson;
  cursor: pointer;
}
.name {
  text-transform: capitalize !important;
}
.rondProfil {
  width: 70px;
  height: 70px;
  background: rgba(122, 121, 121, 0.232);
  border-radius: 100%;
  line-height: 70px;
  text-align: center;
  border: 3px solid rgb(152, 152, 152);
}
.evaluation {
  margin-left: 0.5em;
  width: 160px;
  padding: 0.5em;
  border-radius: 5px;
  background: #f77f00 !important;
  color: wheat;
}
.content_experience {
  padding: 1em;
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: top;
}
.rond {
  width: 45px;
  height: 45px;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.232);
  border-radius: 100%;
  line-height: 45px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
}
.conteneur_ecriteau {
  width: 100% !important;
  padding: -1em 0;
  text-align: left;
  margin-left: 0.5em;
}
.content_commentaire {
  padding: 0.5em 0;
  display: flex;
  width: 80%;
  justify-content: flex-start;
  align-items: top;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.108);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(113, 113, 113);
  border-radius: 10px;
}
.experience button {
  background: transparent !important;
  color: black !important;
  border: none !important;
  font-weight: bold !important;
}
.bande_menu {
  background: #000;
}

.conteneur_star_count {
  position: relative;
}
.conteneur_star_count span {
  position: absolute;
  top: 0;
  right: 82% !important;
}

.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(232, 230, 230, 0.669);
  justify-content: center;
  align-items: center;
  place-items: center;
  z-index: 99;
}
.login_user {
  border: 1px solid orange !important;
  padding: 0.3em;
  border-radius: 10px;
  font-size: 1em !important;
  color: rgb(0, 0, 0) !important;
}

.see_details_emploi {
  position: fixed !important;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  place-items: center;
  background: rgba(141, 137, 137, 0.429);
  z-index: 99;
}
.card-body h5 {
  text-align: left;
  font-size: 1em;
}
.card-body h1 {
  text-align: left;
}
.bg-primary {
  background: #f77f00 !important;
}
.d-none {
  display: none !important;
}
.btnclose {
  position: absolute !important;
  font-size: 1.3em !important;
  cursor: pointer;
  right: 0.5em;
  top: 0.5em;
  color: crimson;
  font-weight: bold;
}
.see_details_emploi .timetable {
  width: 80%;
  background: white;
  height: 90%;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
}
.bg-teal,
.bg-primary,
.bg-warning {
  background: rgb(5, 35, 73) !important ;
  color: white !important;
}

.info_student {
  text-align: left;
  margin-left: 1em;
  margin-top: 4em;
  text-transform: capitalize;
}
.info_student .h1 {
  font-size: 2em;
}
.info_student span {
  margin-top: 0.2em;
  font-size: 1.1em;
  display: block;
}
.d-block {
  display: block;
}
.datepickrs {
  margin: 1em 0;
}
.rangePickers {
  margin: 1em 0;
}
.conteneurInter {
  margin: 1em 0 0 0;
}
.border-input {
  padding: 0.5em 0.3em;
}
.mb-5 {
  margin-bottom: 1em !important;
}
.bx {
  position: absolute !important;
  font-size: 2.5em !important;
  cursor: pointer;
  right: 0.5em;
  top: 0.5em !important;
  color: crimson;
  font-weight: bold;
  box-shadow: 1px 1px 6px solid rgba(0, 0, 0, 0.69);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.button {
  position: relative !important;
  width: auto !important;
  padding: 0.9em !important;
  margin-left: 0.5em !important;
  margin-bottom: 0.2em !important;
  margin-top: 0.98em !important;
  background: rgb(255, 255, 255) !important;
  border-radius: 5px !important;
  border: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.303);
}
.myCalender {
  margin: 0 3em !important;
}
.btnAdd {
  margin: 1em 0 0 0 !important;
  position: relative !important;
  font-weight: bold;
  background: #f77f00 !important;
  color: white;
}
.disponibilite span strong {
  margin: 0 0.5em;
  border-radius: 100%;
  height: 15px;
  width: 15px;
  line-height: 25px;
  font-size: 0.8em;
  text-transform: capitalize;
}
.disponibilite span strong {
  background: rgba(128, 128, 128, 0.262);
  color: rgb(68, 68, 68);
}
.navbar-fixed-top {
  background: #ffffff;
  padding: 0 1em !important;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  font-size: 14px;
}

.number {
  position: absolute;
  right: 1.89em;
  top: -0.658em;
}

.logo img {
  width: 75% !important;
  margin-top: -1em;
}

.logo {
  padding: 0 !important;
}
.notDispo,
.red {
  background: crimson !important;
}
.jou {
  background: linear-gradient(10deg, rgb(2, 123, 56), rgb(0, 230, 31)) !important;
  color: rgb(255, 255, 255) !important;
}
.compte {
  background: rgb(253, 253, 253);
  width: 300px !important;
  right: -1em;
  top: 60px;
  height: auto;
  position: absolute;
  padding: 0.3em !important;
  border-radius: 5px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.259);
}
.text-danger {
  color: crimson !important;
}
.whistList {
  background: rgb(253, 253, 253);
  left: -11em;
  top: 30px;
  height: 350px;
  width: 350px;
  overflow-y: auto;
  padding: 0.5em;
  position: absolute;
  border-radius: 5px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.259);
}
.cont {
  padding: 0.5em 0;
}
.whistList a {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 0.5em;
}

.bi-x {
  top: 0;
  right: 0;
}
.compte ul {
  list-style-type: none;
}
.navbar {
  margin-bottom: 0 !important;
}
.h4,
.fa-user {
  font-size: 0.78em !important;
}
.fw-bold {
  font-weight: bold !important;
}

.listWhistPerson {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  margin-top: 0.5em;
  padding: 1em 0.4em;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.129);
  border-radius: 10px;
  position: relative;
}
.listWhistPerson .deleteForWishList {
  position: absolute;
  right: 0.5em;
  top: -0.1em;
  color: crimson;
  cursor: pointer;
  font-size: 0.6em;
}
.listWhistPerson .jourWishlist {
  font-size: 0.398em !important;
  background: transparent;
  border: 0px solid rgb(5, 35, 73);
  border-radius: 0px;
  color: #232323;
  font-family: OpenSansBold;
  margin-right: 0;
  padding: 0;
  width: 0;
}
h6 {
  padding: 0;
  margin: 0;
}
.btnForInteress {
  padding: 0.4em !important;
}
.jourWishlist strong {
  margin-left: 0.1em;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background: rgb(187, 187, 187);
  border-radius: 100%;
}
h4 {
  font-size: 16px;
  letter-spacing: 0px;
  font-weight: 500;
  margin: 0;
  padding: 0;
}
.navbar-toggle {
  background: rgb(5, 35, 73) !important;
  margin-top: 20px !important;
  top: 5px;
  position: absolute !important;
  right: 1em !important;
}
.list_profit_user li {
  text-align: left;
  font-size: 0.6em;
  padding: 0 0.5em;
  margin: 0.5em 0;
}
.list_profit_user li a {
  color: rgb(5, 35, 73) !important;
}
ul {
  text-align: left !important;
}
.list_profit_user .persona {
  width: 80px;
  height: 80px;
  border-radius: 20%;
  margin-left: 50%;
  transform: translateX(-50%);
}
.persona em {
  font-size: 3em;
}
.list_profit_user .deconnex {
  top: 0;
}
.text-primary {
  color: rgb(5, 35, 73) !important;
}
@media (max-width: 1201px) {
  .conteneurWishlist,
  .ant-dropdown-link {
    display: none;
  }
}
@media (min-width: 1201px) {
  .loginSub,
  .sub_compte,
  .compteSub {
    display: none;
  }
}
</style>
