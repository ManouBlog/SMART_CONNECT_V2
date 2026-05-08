<script>
/* eslint-disable */
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "ProfileView",
  data() {
    return {
      user: this.$store.state.user,
      statut: this.$store.state.user?.statuses,
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
    
      if (this.statut.some(item=>item.statut === "admin" )) {
        this.updateCompteAdmin();
      }
    },
    modifyPassword() {
      if (this.statut.some(item=>item.statut === "admin" )) {
        this.modifyPasswordOfAdmin();
      }
    },
    modifyPasswordOfAdmin() {
      let admin = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      axios
        .post("https://backend.monbrobroli.com/api/passwordModify", admin, {
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
    updateCompteAdmin() {
      axios
        .put(
          "https://backend.monbrobroli.com/api/modifier_profil",
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
                        'https://backend.monbrobroli.com/storage/app/public/images/' +
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
