<script>
/* eslint-disable */
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "InscriptonView",
  data() {
    return {
      status_connex: null,
      status: null,
      nom: null,
      prenoms: null,
      email: null,
      nom_entreprise: null,
      list_email: null,
      My_email: null,
      email_verif: false,
      ville: null,
      commune: null,
      quartier: null,
      phone: null,
      diplome: null,
      password: null,
      registre_commerce: null,
      form: true,
      status_id: null,
      image1: require("../assets/logo/clip-136.png"),
      image2: require("../assets/logo/3d-flame-businesswoman-at-the-office-reception.png"),
    };
  },
  methods: {
    account() {
      this.$router.push("/dashboard");
    },
    get_email_for_verif() {
      axios
        .get("http://127.0.0.1:8000/api/listerUser", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.list_email = res.data.data;

          this.My_email = this.list_email.find((item) => item.email == this.email);
          console.log("EMAIL", this.My_email);
        });
    },
    connex_student() {
      this.status_connex = "etudiant";
      this.status = "student";
      this.form = false;
      console.log(this.status);
      this.status_id = 2;
    },
    connex_entreprise() {
      this.status_connex = "entreprise";
      this.status = "entreprise";
      this.form = false;
      console.log(this.status);
      this.status_id = 1;
    },
    back() {
      this.form = true;
      this.status_connex = null;
      this.nom = null;
      this.prenoms = null;
      this.email = null;
      this.ville = null;
      this.commune = null;
      this.quartier = null;
      this.phone = null;
      this.diplome = null;
      this.password = null;
    },
    inscription() {
      this.get_email_for_verif();
      if (this.status == "student") {
        axios
          .post("http://127.0.0.1:8000/api/list_users", {
            status: "student",
            nom: this.nom,
            prenoms: this.prenoms,
            email: this.email,
            ville: this.ville,
            commune: this.commune,
            quartier: this.quartier,
            phone: this.phone,
            diplome: this.diplome,
            password: this.password,
            statut_id: this.status_id,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.status == true) {
              Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });

              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            }
            if (res.data.status == false) {
              Swal.fire({
                icon: "error",
                title: "erreur",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
      if (this.status == "entreprise") {
        axios
          .post("http://127.0.0.1:8000/api/list_users", {
            status: "entreprise",
            nom: this.nom_entreprise,
            registre_commerce: this.registre_commerce,
            email: this.email,
            password: this.password,
            statut_id: this.status_id,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.status == true) {
              Swal.fire({
                icon: "success",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
            }
            if (res.data.status == false) {
              Swal.fire({
                icon: "error",
                title: "erreur",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              icon: "error",
              title: "l'email existe déjà",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },
  },
  created() {},
};
</script>
<template>
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <form class="theme-form login-form position-relative">
              <i
                class="bi bi-arrow-left-circle"
                @click="back"
                v-if="status_connex == 'etudiant' || status_connex == 'entreprise'"
              ></i>
              <h4>Créer un compte</h4>
              <h6>Entrer vos informations personnel pour créer votre compte</h6>
              <div class="row choose_statut" v-show="form">
                <div class="col-md-6 col-sm-12 content mx-1" @click="connex_student">
                  <span class="h4">Etudiant</span>
                  <img :src="image1" alt="student" class="img" />
                </div>

                <div class="col-md-6 col-sm-12 content mx-1" @click="connex_entreprise">
                  <span class="h4">Entreprise</span>
                  <img :src="image2" alt="company" class="img" />
                </div>
              </div>
              <!--INSCRIPTION ETUDIANT-->
              <form @submit.prevent="inscription" v-show="status_connex == 'etudiant'">
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>Nom</label>
                    <input type="text" v-model="nom" required placeholder="ex:Adjobi" />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Prénoms</label>
                    <input
                      type="text"
                      v-model="prenoms"
                      required
                      placeholder="ex:kadjo pierre"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>Télephone</label>
                    <input
                      type="text"
                      v-model="phone"
                      required
                      placeholder="ex:0545749741"
                      pattern="[0-9]*"
                    />
                    <span
                      class="d-block text-danger entreprise_caractere"
                      v-if="typeof this.phone === 'string'"
                      ><b>*le numéro doit être en chiffres</b></span
                    >
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Ville</label>
                    <input
                      type="text"
                      v-model="ville"
                      required
                      placeholder="ex:Abidjan"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>Commune</label>
                    <input
                      type="text"
                      v-model="commune"
                      required
                      placeholder="ex:yopougon"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Quartier</label>
                    <input
                      type="text"
                      v-model="quartier"
                      required
                      placeholder="ex:Maroc"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Diplome</label>
                    <input
                      type="text"
                      v-model="diplome"
                      required
                      placeholder="ex:licence 3 informatique"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>E-mail</label>
                    <input
                      type="email"
                      v-model="email"
                      required
                      placeholder="ex:adjobi@gmail.com"
                    />
                    <span v-if="My_email"
                      ><b class="text-danger">*l'email existe deja</b></span
                    >
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Password</label>
                    <input
                      type="password"
                      v-model="password"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <button class="btn-lg btn-primary btn-block" type="submit">
                    Créer un compte <i class="bi bi-save"></i>
                  </button>
                </div>
              </form>
              <!--INSCRIPTION ENTREPRISE-->
              <form @submit.prevent="inscription" v-show="status_connex == 'entreprise'">
                <div class="row">
                  <div class="form-group col-md-6 col-sm-12">
                    <label>Entreprise</label>
                    <input
                      type="text"
                      v-model="nom_entreprise"
                      required
                      placeholder="ex:lce"
                    />
                    <span
                      v-if="nom_entreprise"
                      class="d-block text-danger entreprise_caractere"
                      ><b v-if="nom_entreprise.length == 2 || nom_entreprise.length == 1"
                        >*le nom de l'entreprise doit être plus de 3 caractères</b
                      ></span
                    >
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label>Regitre de commerce</label>
                    <input
                      type="text"
                      v-model="registre_commerce"
                      required
                      placeholder="ex:125ddjf55dx252021"
                    />
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label>E-mail</label>
                    <input
                      type="email"
                      v-model="email"
                      required
                      placeholder="ex:lce@gmail.com"
                    />
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label>Password</label>
                    <input
                      type="password"
                      v-model="password"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn-lg btn-primary btn-block" type="submit">
                    Créer un compte <i class="bi bi-save"></i>
                  </button>
                </div>
              </form>
              <p>
                Vous avez déjà un compte?<router-link
                  class="ms-2 connex"
                  :to="{ name: 'form' }"
                  >S'identifier</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import url("../assets/css/inscriptionView.css");
.entreprise_caractere {
  font-size: 0.8em !important;
}
</style>
