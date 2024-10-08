<script>
import Swal from "sweetalert2";
import instance, { lienPhoto } from "../../../api/api";
import InfoEntreprise from "./feature/InfoEntreprise.vue";
// import InfoParticulier from "./feature/InfoParticulier.vue"
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import ModalForModifyInfo from "./feature/ModalForModifyInfo.vue";

export default {
  name: "ProfileView",
  components: {
    InfoEntreprise,
    HeaderDashboard,
    ModalForModifyInfo,
  },
  data() {
    return {
      user: this.$store.state.user,
      nom: "",
      prenoms: "",
      lienPhoto: lienPhoto,
      password: null,
      commune: "",
      quartier: "",
      ville: "",
      diplome: "",
      phone: "",
      registre_commerce: "",
      oldPassword: "",
      photo: {},
      cpassword: "",
      msgErr: false,
    };
  },
  methods: {
    update_offre() {
      if (this.user.user.statut.statut === "entreprise") {
        this.update_compte_entreprise();
      }
      if (this.user.user.statut.statut === "etudiant") {
        this.update_compte_etudiant();
      }
      if (this.user.user.statut.statut === "admin") {
        this.updateCompteAdmin();
      }
    },
    modifyPassword() {
      if (this.user.user.statut.statut === "etudiant") {
        this.modifyPasswordOfStudent();
      }
      if (this.user.user.statut.statut === "entreprise") {
        this.modifyPasswordOfEntreprise();
      }
      if (this.user.user.statut.statut === "admin") {
        this.modifyPasswordOfAdmin();
      }
    },
    modifyPasswordOfStudent() {
      let info = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(info);
    },
    modifyPasswordOfEntreprise() {
      let Entreprise = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(Entreprise);
    },

    modifyPasswordOfAdmin() {
      let admin = {
        oldPassword: this.oldPassword,
        password: this.password,
      };
      this.routeForLaunch(admin);
    },
    routeForLaunch(data) {
      if (this.cpassword !== this.password) {
        this.msgErr = true;
      } else {
        instance
          .post("passwordModify", data)
          .then((resp) => {
            console.log(resp);
            if (resp.data.status === true) {
              Swal.fire({
                icon: "success",
                title: "Mot de passe changé",
                showConfirmButton: false,
                timer: 1500,
              });
              //setTimeout(() => {
              //location.reload(true);
              //}, 1500);
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
      }
    },
    // update_compte_entreprise() {
    //   let compte_entreprise = {
    //     nom: this.nom,
    //     registre_commerce: this.registre_commerce,
    //     password: this.password,
    //     oldPassword: this.oldPassword,
    //   };
    //   instance
    //     .put("modifier_profil", compte_entreprise)
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.status === true) {
    //         Swal.fire({
    //           icon: "success",
    //           title: res.data.message,
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //         localStorage.setItem("user", JSON.stringify(res.data.user));
    //         this.$store.state.user = res.data.user;
    //         //setTimeout(() => {
    //         //location.reload(true);
    //         //}, 1500);
    //       }
    //       if (res.data.status === false) {
    //         Swal.fire({
    //           icon: "error",
    //           title: res.data.message,
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
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
      instance
        .post("modifier_profil", data)
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
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
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
      instance
        .put("modifier_profil", {
          nom: this.nom,
          password: this.password,
          oldPassword: this.oldPassword,
        })
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
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
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
  <section>
    <ModalForModifyInfo />
    <HeaderDashboard :TitleHeader="'Profil'" :subTitleHeader="'Profil'" />
    <div class="page-body">
      <div>
        <InfoEntreprise
          v-if="this.user.user.statut.statut === 'entreprise'"
          :infoPersonellesEntreprise="[
            { libelle: 'Nom :', value: user.nom },
            { libelle: 'Email :', value: user.email },
            { libelle: 'Matricule/cc :', value: user.matricule_cc },
            { libelle: 'Contact :', value: user.contact },
            { libelle: 'Ville :', value: user.ville },
            { libelle: 'Commune :', value: user.commune },
            { libelle: 'Quatier :', value: user.quartier },
            { libelle: 'Document :', value: user.registre },
            { libelle: 'Forme juridique :', value: user.forme_juridique },
          ]"
          :infoPersonellesGerant="[
            { libelle: 'Nom & Prénoms :', value: user.gerant },
            { libelle: 'Contact :', value: user.numero_gerant },
            { libelle: 'Pièce d identite :', value: user.piece_gerant },
          ]"
        />
        <!-- <CadreProfilView /> -->
        <!-- <div class="edit-profile">
          <div class="row">
            <div class="col-lg-5">
              <form class="card">
                <div class="card-header pb-0">
                  <h4>Mes informations personnels</h4>
                </div>
                <div
                  class="card-body text-left"
                  v-if="this.user.user.statut.statut === 'etudiant'"
                >
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
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
                      <div class="mb-3">
                        <label class="form-label">Diplome</label>
                        <input
                          v-model="user.diplome"
                          class="form-control"
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-md-12 ">
                      <label class="form-label d-block">Document</label>
                      <div class="text-center">
                        <img
                        :src="
                        lienPhoto + user.photo
                        "
                        :alt="user.photo"
                        class="w-50 "
                      />
                      </div>
                     
                    </div>
                  </div>
                </div>
                <InfoEntreprise />
                <InfoParticulier />
              </form>
            </div>
            <div class="col-lg-7">
              <form
                class="card"
                v-if="statut === 'etudiant' || statut === 'admin'"
              >
                <div class="card-header pb-0">
                  <h4>Modifier mon profil</h4>
                  <span>Gérer les paramétres de votre profil</span>
                </div>
                <div
                  class="card-body text-left"
                  v-if="this.user.user.statut.statut === 'etudiant'"
                >
                  <div class="row">
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="nom" class="form-control" type="text" />
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Prénoms</label>
                        <input
                          v-model="prenoms"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Télephone</label>
                        <input v-model="phone" class="form-control" type="text" />
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="mb-3">
                        <label class="form-label">ville</label>
                        <input v-model="ville" class="form-control" type="text" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Commune</label>
                        <input
                          v-model="commune"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Quartier</label>
                        <input
                          v-model="quartier"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                      <div class="mb-3">
                        <label class="form-label">Diplome</label>
                        <input
                          v-model="diplome"
                          class="form-control"
                          type="text"
                        />
                      </div>
                    </div>
  
                    <div class="col-sm-12 col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Diplôme / Carte étudiant</label>
                        <input
                          @change="see"
                          class="form-control"
                          type="file"
                          accept="*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="card-body"
                  v-if="this.user.user.statut.statut === 'admin'"
                >
                  <div class="row">
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="nom" class="form-control" type="text" />
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
              <form class="card p-5" @submit.prevent="modifyPassword">
                <div class="pb-0 card-header">
                  <h4>Modifier mon mot de passe</h4>
                </div>
                
                <div class="col-sm-12 col-md-12 text-left card-body">
                  <div class="mb-3">
                    <label class="form-label"
                      >Entrer votre mot de passe actuel</label
                    >
                    <input
                      v-model="oldPassword"
                      class="form-control"
                      type="password"
                      placeholder="xxxxxxx"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Nouveau mot de passe</label>
                    <input
                      v-model="password"
                      class="form-control"
                      type="password"
                      placeholder="xxxxxxx"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Confirmer le nouveau mot de passe</label>
                    <input
                      v-model="cpassword"
                      class="form-control"
                      type="password"
                      placeholder="xxxxxxx"
                      required
                    />
                  </div>
                  <span class="text-danger">{{ msgErr ? "Les mots de passes ne correspond pas":null }}</span>
                </div>
               
                <div class="card-footer text-end">
                  <button
                    class="btn-lg bg-warning  updateProfil"
                    type="submit"
                    
                  >
                    Modifier
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
.updateProfil {
  margin: 0 !important;
  transform: translateX(0) !important;
}
img {
  border: 5px solid black;
}

.mb-3 {
  margin-bottom: 1em !important;
}
</style>
