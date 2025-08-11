<script>
import instance from "../api/api";
import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import RotateLoader from "vue-spinner/src/RotateLoader.vue";
import Span from "../components/feature/Span.vue";
import "@kong/kongponents/dist/style.css";
// import Politics from "../components/feature/Politics.vue";
import Abonnement from "../components/feature/Abonnement.vue";

export default {
  name: "Registre",
  components: {
    // VueMultiselect,
    RotateLoader,
    Abonnement,
    // Politics,
    Span,
  },
  data() {
    return {
      eightCaractere: false,
      lettreMaj: false,
      letterMin: false,
      chiffreCode: false,
      caractereSpecial: false,
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      status: "",
      formeJuridique: "",
      status_connex: "",
      numero_gerant: "",
      gerant: "",
      isAcceptPolitic: false,
      email: null,
      content: null,
      password: null,
      nom: null,
      prenoms: null,
      ville: null,
      commune: null,
      quartier: null,
      phone: null,
      diplome: null,
      statut_id: null,
      status_id: null,
      matriculeCC: null,
      nom_entreprise: null,
      fileForPieceGerant: "",
      competences: "",
      ville_entreprise: "",
      fileForRegistre: "",
      competence: [],
      acquis: null,
      comp: [],
      detailOfExperience: "",
      photo: {},
      showLoader: false,
      checkboxDate: true,
    };
  },
  methods: {
    uploadFilePieceGerant(e) {
      this.fileForPieceGerant = e.target.files[0];
    },
    selectFileForRegistre(e) {
      console.log(e);
      this.fileForRegistre = e.target.files[0];
    },
    isPhoneCi(value) {
      return /\d{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}/.test(value);
    },
    connex() {
      this.$router.push("/dash");
    },
    see(e) {
      this.photo = e.target.files[0];
      console.log(this.photo);
    },
    inscriptionStudent() {
      let data = new FormData();
      this.comp.forEach((item) => {
        data.append("competence[]", item);
      });
      data.append("nom", this.nom);
      data.append("prenoms", this.prenoms);
      data.append("email", this.email);
      data.append("commune", this.commune);
      data.append("quartier", this.quartier);
      data.append("phone", this.phone);
      data.append("ville", this.ville);
      data.append("diplome", this.diplome);
      data.append("password", this.password);
      data.append("statut_id", 2);
      data.append("photo", this.photo);
      instance
        .post("list_users", data)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
            this.showLoader = false;
            this.$router.push("/");
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: "erreur",
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
            this.showLoader = false;
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "info",
            title: error.response.data.message,
            showConfirmButton: true,
          });
          this.showLoader = false;
        });
    },
    inscriptionEntreprise() {
      let data = new FormData();
      data.append("nom", this.nom_entreprise);
      data.append("email", this.email);
      data.append("gerant", this.gerant);
      data.append("numero_gerant", this.numero_gerant);
      data.append("piece_gerant", this.fileForPieceGerant);
      data.append("commune", this.commune);
      data.append("forme_juridique", this.formeJuridique);
      data.append("quartier", this.quartier);
      data.append("contact", this.phone);
      data.append("ville", this.ville);
      data.append("matricule_cc", this.matriculeCC);
      data.append("password", this.password);
      data.append("statut_id", 1);
      data.append("registre", this.fileForRegistre);
      instance
        .post("list_users", data)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
            this.showLoader = false;
            this.$router.push("/");
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: "erreur",
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
          }
        })
        .catch((err) => {
          console.log("ERROR", err);
          // Swal.fire({
          //   icon: "error",
          //   title: "l'email existe déjà",
          //   showConfirmButton: true,
          // });
        });
    },
    inscriptionParticulier() {
      instance
        .post("list_users", {
          nom: this.nom,
          email: this.email,
          password: this.password,
          contact: this.phone,
          ville: this.ville,
          commune: this.commune,
          particulier_prenoms: this.prenoms,
          statut_id: 4,
        })
        .then((rep) => {
          console.log(rep);
          console.log(rep.data);
          if (rep.data.status === true) {
            Swal.fire({
              icon: "success",
              title: rep.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
            this.showLoader = false;
            this.$router.push("/");
          }
          if (rep.data.status === false) {
            Swal.fire({
              icon: "error",
              title: "erreur",
              showConfirmButton: false,
              timer: 1500,
            });
            this.email = null;
            this.password = null;
          }
        })
        .catch((error) => {
          console.log(error.message);
          Swal.fire({
            icon: "error",
            title: "l'email existe déjà",
            showConfirmButton: true,
          });
        });
    },

    inscriptionUser() {
      if (this.status === "student") {
        this.inscriptionStudent();
      }
      if (this.status == "entreprise") {
        this.inscriptionEntreprise();
      }
      if (this.status == "particulier") {
        this.inscriptionParticulier();
      }
    },

    connexionUser() {
      console.log("connex1")
      instance
        .post("auth_login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("reponse", response.data);
          console.log("token", response.data.access_token);

          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true,
            });
            this.$store.commit("ADD_ITEM");
            window.localStorage.setItem("user", JSON.stringify(response.data.user));
            window.localStorage.setItem(
              "token",
              JSON.stringify(response.data.access_token)
            );
            this.$store.state.user = response.data.user;
            console.log("essai", this.$store.state.charte);
            this.$store.state.token = response.data.access_token;
            this.showLoader = false;
            this.$router.push({
              path: "/",
              query: { redirect: this.path },
            });
          }
          if (response.data.status === false) {
            this.showLoader = false;
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: true,
            });
          }
        })
        .catch((response) => {
          this.showLoader = false;
          Swal.fire({
            icon: "info",
            title: response.message,
            showConfirmButton: true,
          });
          console.log(response.message);
        });
    },
    verifPassword(password) {
      let isCorrect;
      if (
        /\d/.test(password) &&
        /[a-z]/.test(password) &&
        password.length > 8 &&
        this.verifChiffre.test(password)
      ) {
        isCorrect = true;
      } else {
        isCorrect = false;
      }
      return isCorrect;
    },
    middlewareStudent() {
      if (
        this.email &&
        this.nom &&
        this.password &&
        this.prenoms &&
        this.phone &&
        this.photo &&
        this.ville &&
        this.commune
      ) {
        let isCorrectPassword = this.verifPassword(this.password);
        if (isCorrectPassword) {
          this.isAcceptPolitic = true;
        } else {
          Swal.fire({
            icon: "info",
            title: `
                Votre mot de passe doit contenir:
Au moins 8 caractères
Une lettre majuscule
Une lettre miniscule
Un chiffre
Un caractère spécial
`,
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez remplir les champs en astérisque.",
          showConfirmButton: true,
        });
        console.log("veuillez remplir les champs");
      }
    },
    middlewareEntreprise() {
      if (
        this.nom_entreprise &&
        this.matriculeCC &&
        this.email &&
        this.fileForRegistre &&
        this.phone &&
        this.ville &&
        this.gerant &&
        this.numero_gerant &&
        this.fileForPieceGerant &&
        this.password &&
        this.commune
      ) {
        let isCorrectPassword = this.verifPassword(this.password);
        if (isCorrectPassword) {
          this.isAcceptPolitic = true;
        } else {
          Swal.fire({
            icon: "info",
            title: `
                Votre mot de passe doit contenir:
Au moins 8 caractères
Une lettre majuscule
Une lettre miniscule
Un chiffre
Un caractère spécial
`,
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez remplir les champs en astérisque.",
          showConfirmButton: true,
        });
      }
    },
    middlewareParticulier() {
      if (
        this.nom &&
        this.phone &&
        this.email &&
        this.password &&
        this.prenoms &&
        this.commune
      ) {
        let isCorrectPassword = this.verifPassword(this.password);
        if (isCorrectPassword) {
          this.isAcceptPolitic = true;
        } else {
          Swal.fire({
            icon: "info",
            title: `
                Votre mot de passe doit contenir:
Au moins 8 caractères
Une lettre majuscule
Une lettre miniscule
Un chiffre
Un caractère spécial
`,
            showConfirmButton: true,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez remplir les champs en astérisque.",
          showConfirmButton: true,
        });
      }
    },
    registerUser() {
      console.log("THIS STATUS", this.status);
      if (this.status === "student") {
        console.log("competence", this.competence);
        this.middlewareStudent();
      }
      if (this.status == "entreprise") {
        this.middlewareEntreprise();
      }
      if (this.status == "particulier") {
        this.middlewareParticulier();
      }
    },
    getAllCompetences() {
      instance
        .get("GetAllCompetences")
        .then((res) => {
          console.log("COMPETENCE", res);
          this.competences = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTag(newTag) {
      console.log(newTag);
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });
      console.log("THIS.comp", this.comp);
    },
    authGoogle() {
      instance.get("google/redirect").then((response) => {
        console.log("response", response.data.url);
        window.open(response.data.url, "example", {
          default: "width=300,height=300,scrollbars=yes",
        });
      });
      console.log("authGoogle");
    },
  },
  created() {
    this.getAllCompetences();
  },
};
</script>

<template>
  <div class="loading" v-show="showLoader">
    <RotateLoader :loading="true"></RotateLoader>
  </div>
  <div id="header" class="container-fluid pages">
    <div class="row"></div>
  </div>

  <section v-if="this.$store.state.translate === 'FR'">
    <div class="conteneur-flex" v-if="this.$store.state.abonnement">
      <Abonnement />
    </div>
    <div class="container-fluid login_register header_area deximJobs_tabs">
      <div class="row">
        <div class="container main-container-home">
          <div class="col-lg-offset-1 col-lg-11 col-md-12 col-sm-12 col-xs-12">
            <ul class="nav nav-pills registre_login_connex">
              <li class="active">
                <a data-toggle="tab" href="#login">Connexion</a>
              </li>
              <li>
                <a data-toggle="tab" href="#register-account">Inscription</a>
              </li>
            </ul>

            <div class="tab-content">
              <div id="register-account" class="tab-pane fade in white-text">
                
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right sidebar">
                  <div class="widget">
                    <h3>POURQUOI AVOIR UN COMPTE DANS SMART-CONNECT?</h3>
                    <ul>
                      <li>
                        <p class="listes">
                          <em class="fa fa-clock-o"></em>Demande rapide d'offres, les
                          documents nécessaires sont toujours à portée de main
                        </p>
                      </li>
                      <li>
                        <p class="listes">
                          <em class="fa fa-child"></em>Ciblez efficacement les employeurs.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="login" class="tab-pane fade active in white-text">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 zero-padding-left">
                  <form
                    name="contact_us"
                    class="contact_us"
                    @submit.prevent="connexionUser"
                  >
                    <div class="text-left w-100">
                      <Span :name="'Email'" :isFacultatif="true" />
                      <input
                        type="text"
                        v-model="email"
                        name="name"
                        class="w-100 my-3"
                        autocomplete="on"
                      />
                    </div>
                    <div class="text-left w-100">
                      <Span :name="'Mot de passe'" :isFacultatif="true" />
                      <input
                        type="password"
                        v-model="password"
                        name="password-2"
                        id="password-2"
                        class="w-100 my-3"
                      />
                    </div>

                    <div>
                      <button type="submit" class="bg-lg bg-second">
                        <em class="bi bi-box-arrow-in-right w3-margin-right"></em>
                        Se connecter
                      </button>
                      <router-link to="/reset_password" class="lost_password"
                        >Mot de passe oublié ?</router-link
                      >
                    </div>
                  </form>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12 pull-right sidebar">
                  <div class="widget">
                    <h3>VOUS N'AVEZ PAS DE COMPTE ?</h3>
                    <ul>
                      <li>
                        <p class="listes">
                          Si vous souhaitez en savoir plus sur la manière dont
                          MySmartConnect peut vous aider dans vos besoins de recrutement,
                          veuillez remplir ce formulaire de demande.
                        </p>
                      </li>
                      <li>
                        <p class="listes">
                          Un membre de notre équipe commerciale vous contactera sous peu.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conteneur-flex {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 9999999999;
  display: flex;
  place-items: center;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.452);
}
.password_length {
  font-size: 0.7em !important;
  font-weight: bold !important;
}

input[type="checkbox"] {
  width: 10px !important;
}

ul {
  padding: 1em;
}
.ProseMirror p {
  color: rgb(3, 3, 3) !important;
  margin: 0;
}
.listes {
  color: white !important;
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
.fw-bold {
  font-weight: bold;
}
.btn-Conex {
  background: #f77f00 !important;
  color: white;
  border: 1px solid black;
}
.diplome {
  margin-left: 4em !important;
}
.text-danger {
  color: crimson;
}
strong {
  font-size: 0.8em;
  color: crimson;
}
.cont_multi {
  display: flex;
  justify-content: center;
  align-content: flex-end;
}

.condition {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5em;
}
.condition span a {
  text-decoration: underline;
  color: #f77f00;
}
.select {
  font-size: 16px;
  padding: 10px 16px;
  border: 1px solid rgb(5, 35, 73);
}
.bg-second {
  width: auto;
  border-radius: 10px;
  border: none;
  background: #f77f00 !important;
  color: white;
  padding: 10px;
  border: 1px solid black;
}
label {
  color: rgb(101, 101, 101) !important;
}
input {
  border: 1px solid rgb(5, 35, 73) !important;
}
.deximJobs_tabs {
  background: rgb(255, 255, 255) !important;
  color: black !important;
  box-shadow: none !important;
}
.deximJobs_tabs .nav li a {
  color: rgb(54, 53, 53);
}
.deximJobs_tabs .sidebar {
  background: rgb(5, 35, 73);
}
.bi {
  font-size: 1.5em !important;
}
.registre_login_connex a {
  font-size: 2em !important;
  text-transform: capitalize !important;
  transition: all 0.1s ease;
}
.active {
  text-decoration: underline !important;
}
.vuemulti,
textarea {
  width: 100% !important;
  font-size: 16px !important;
  border: 1px solid black;
}
.conteneur_editor {
  border: 1px solid black;
  color: black !important;
  border-radius: 1em;
}

/*.vuemulti label{
  margin:0 !important;
}*/
/*.vuemulti{
  margin-right: 1em;
  margin-top: 1em;
  border-radius: 10px;
}*/

.ProseMirror p {
  color: black !important;
  margin: 1em 0;
}
.invalid {
  outline: 2px solid red;
}
@media (max-width: 1020px) {
  .select {
    width: 100%;
  }
  .diplome {
    margin-left: 0 !important;
  }
}
</style>
<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.css"></style>
