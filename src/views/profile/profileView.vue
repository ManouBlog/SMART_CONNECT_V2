<script>
/* eslint-disable */
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "ProfileView",
  data() {
    return {
      user: this.$store.state.user,
      statut: this.$store.state.user.statut.statut,
      // compte: this.$store.state.compte,
      nom: "",
      prenoms: "",
      email: "",
      password: null,
      commune: "",
      quartier: "",
      ville: "",
      diplome: "",
      phone: "",
      registre_commerce: "",
      oldPassword: "",
      photo: {},
    };
  },
  methods: {
    update_offre() {
      if (this.statut === "entreprise") {
        this.update_compte_entreprise();
      }
      if (this.statut === "etudiant") {
        this.update_compte_etudiant();
      }
      if (this.statut === "admin") {
        this.updateCompteAdmin();
      }
    },
    modifyPassword() {
      if (this.statut === "etudiant") {
        this.modifyPasswordOfStudent();
      }
      if (this.statut === "entreprise") {
        this.modifyPasswordOfEntreprise();
      }
      if (this.statut === "admin") {
        this.modifyPasswordOfAdmin();
      }
    },
    modifyPasswordOfStudent() {
      let info = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      axios
        .post("https://backend.smart-connect.online/api/passwordModify", info, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: "Mot de passe changé",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyPasswordOfEntreprise() {
      let Entreprise = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      axios
        .post("https://backend.smart-connect.online/api/passwordModify", Entreprise, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: "Mot de passe changé",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyPasswordOfAdmin() {
      let admin = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      axios
        .post("https://backend.smart-connect.online/api/passwordModify", admin, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.status === true) {
            Swal.fire({
              icon: "success",
              title: "Mot de passe changé",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (resp.data.status === false) {
            Swal.fire({
              icon: "error",
              title: resp.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update_compte_entreprise() {
      let compte_entreprise = {
        nom: this.nom,
        registre_commerce: this.registre_commerce,
        password: this.password,
        oldPassword: this.oldPassword,
      };
      axios
        .put(
          "https://backend.smart-connect.online/api/modifier_profil",
          compte_entreprise,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.$store.state.user = res.data.user;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update_compte_etudiant() {
      let data = new FormData();
      data.append("nom", this.nom);
      data.append("prenoms", this.prenoms);
      data.append("email", this.email);
      data.append("commune", this.commune);
      data.append("quartier", this.quartier);
      data.append("phone", this.phone);
      data.append("ville", this.ville);
      data.append("diplome", this.diplome);
      data.append("photo", this.photo);
      axios
        .post("https://backend.smart-connect.online/api/modifier_profil", data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res.data.user);
          console.log("COMPTE", res.data.compte);
          if (res.data.status === true) {
            this.$store.state.user = res.data.user;
            this.$store.state.compte = res.data.compte;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("compte", JSON.stringify(res.data.compte));
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    updateCompteAdmin() {
      axios
        .put(
          "https://backend.smart-connect.online/api/modifier_profil",
          {
            nom: this.nom,
            password: this.password,
            oldPassword: this.oldPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((reponse) => {
          console.log(reponse);
          if (reponse.data.status === true) {
            Swal.fire({
              icon: "success",
              title: reponse.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.setItem("user", JSON.stringify(reponse.data.user));
            this.$store.state.user = reponse.data.user;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (reponse.data.status === false) {
            Swal.fire({
              icon: "error",
              title: reponse.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: error.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    see(e) {
      this.photo = e.target.files[0];
      console.log(this.photo);
    },
  },
};
</script>

<template>
  <div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html"> <em data-feather="home"></em></a>
              </li>
              <li class="breadcrumb-item">Compte</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="edit-profile">
        <div class="row">
          <div class="col-lg-5">
            <form class="card">
              <div class="card-header pb-0">
                <h4 class="card-title mb-0">Mon profil</h4>
              </div>
              <div class="card-body" v-if="this.statut === 'etudiant'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.nom"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Prénoms</label>
                      <input
                        v-model="user.prenoms"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Email</label>
                      <input
                        v-model="user.email"
                        class="form-control"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Télephone</label>
                      <input
                        v-model="user.phone"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">ville</label>
                      <input
                        v-model="user.ville"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Commune</label>
                      <input
                        v-model="user.commune"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Quartier</label>
                      <input
                        v-model="user.quartier"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Diplome</label>
                      <input
                        v-model="user.diplome"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Document</label>
                    <img
                      :src="
                        'https://backend.smart-connect.online/storage/images/' +
                        user.photo
                      "
                      :alt="user.photo"
                      class="w-75"
                    />
                  </div>
                </div>
              </div>
              <div class="card-body" v-if="this.statut === 'entreprise'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.nom"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Email</label>
                      <input
                        v-model="user.email"
                        class="form-control"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Registre de commerce</label>
                      <input
                        v-model="user.registre_commerce"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body" v-if="this.statut === 'admin'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.nom"
                        class="form-control"
                        type="text"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Email</label>
                      <input
                        v-model="user.email"
                        class="form-control"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <!-- Container-fluid Ends-->
          </div>
          <div class="col-lg-7">
            <form class="card" v-if="statut === 'etudiant' || statut === 'admin'">
              <div class="card-header pb-0">
                <h4 class="card-title mb-0">Modifier mon profil</h4>
                <span>Gérer les paramétres de votre profil</span>
              </div>
              <div class="card-body" v-if="this.statut === 'etudiant'">
                <div class="row">
                  <div class="col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Nom</label>
                      <input v-model="nom" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Prénoms</label>
                      <input v-model="prenoms" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Télephone</label>
                      <input v-model="phone" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">ville</label>
                      <input v-model="ville" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Commune</label>
                      <input v-model="commune" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Quartier</label>
                      <input v-model="quartier" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3 text-start">
                      <label class="form-label">Diplome</label>
                      <input v-model="diplome" class="form-control" type="text" />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Diplôme / Carte étudiant</label>
                      <input @change="see" class="form-control" type="file" accept="*" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body" v-if="this.statut === 'admin'">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Nom</label>
                      <input v-model="nom" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3 text-start">
                      <label class="form-label">Email</label>
                      <input v-model="email" class="form-control" type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-end">
                <button
                  class="btn btn-primary updateProfil"
                  @click.prevent="update_offre"
                >
                  Mettre à jour le profil
                </button>
              </div>
            </form>
            <div class="card px-5">
              <div class="card-header pb-0">
                <h4 class="card-title my-4">Modifier mon mot de passe</h4>
              </div>
              <div class="col-sm-12 col-md-12">
                <div class="mb-3 text-start">
                  <label class="form-label">Entrer votre mot de passe actuel</label>
                  <input
                    v-model="oldPassword"
                    class="form-control"
                    type="password"
                    placeholder="xxxxxxx"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <div class="mb-3 text-start">
                  <label class="form-label">Nouveau mot de passe</label>
                  <input
                    v-model="password"
                    class="form-control"
                    type="password"
                    placeholder="xxxxxxx"
                  />
                </div>
              </div>
              <div class="card-footer text-end" v-if="password != null">
                <button class="btn btn-primary updateProfil" @click="modifyPassword">
                  Modifier
                </button>
              </div>
            </div>
            <!-- Container-fluid Ends-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.updateProfil {
  margin: 0 !important;
  transform: translateX(0) !important;
}
img {
  border: 5px solid black;
}
</style>
