<script>
// import Swal from "sweetalert2";
import instance from "../api/api";
export default {
  name: "ProfileView",
  data() {
    return {
      user: this.$store.state.user,
      // role: this.$store.state.role,
      // profil: this.$store.state.profil,
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
    },
    update_compte_entreprise() {
      let compte_entreprise = {
        nom: this.user.user.statut.statut,
        registre_commerce: this.user.registre_commerce,
      };
      instance.put("modifier_profil", compte_entreprise)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            //setTimeout(() => {
              //location.reload(true);
            //}, 1500);
          }
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          this.$store.state.user = res.data.data.user;
       
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update_compte_etudiant() {
      let compte_student = {
        nom: this.user.user.nom,
        prenoms: this.user.user.prenoms,
        email: this.user.user.email,
        phone: this.user.user.phone,
        ville: this.user.user.ville,
        commune: this.user.user.commune,
        quartier: this.user.user.quartier,
        diplome: this.user.user.diplome,
      };
      instance.put("modifier_profil", compte_student)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            //setTimeout(() => {
              //location.reload(true);
            //}, 1500);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
           
            this.$store.state.user = res.data.data.user;
      
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   icon: "error",
          //   title: err.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        });
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
                <a href="index.html"> <i data-feather="home"></i></a>
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
          <div class="col-xl-12">
            <form class="card">
              <div class="card-header pb-0">
                <h4 class="card-title mb-0">Modifier mon compte</h4>
                <div class="card-options">
                  <a
                    class="card-options-collapse"
                    href="#"
                    data-bs-toggle="card-collapse"
                    ><i class="fe fe-chevron-up"></i></a
                  ><a
                    class="card-options-remove"
                    href="#"
                    data-bs-toggle="card-remove"
                    ><i class="fe fe-x"></i
                  ></a>
                </div>
              </div>
              <div class="card-body" v-if="user.user.statut.statut == 'etudiant'">
                <div class="row">
                  <div class="col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.user.nom"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Prénoms</label>
                      <input
                        v-model="user.user.prenoms"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input
                        v-model="user.user.email"
                        class="form-control"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Télephone</label>
                      <input
                        v-model="user.user.phone"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">ville</label>
                      <input
                        v-model="user.user.ville"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Commune</label>
                      <input
                        v-model="user.user.commune"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Quartier</label>
                      <input
                        v-model="user.user.quartier"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3">
                    <div class="mb-3">
                      <label class="form-label">Diplome</label>
                      <input
                        v-model="user.user.diplome"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body" v-if="user.user.statut.statut == 'entreprise'">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.user.nom"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input
                        v-model="user.user.email"
                        class="form-control"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Registre de commerce</label>
                      <input
                        v-model="user.user.registre_commerce"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body" v-if="user.user.statut.statut == 'admin'">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Nom</label>
                      <input
                        v-model="user.nom"
                        class="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div class="col-sm-6 col-md-6">
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
                </div>
              </div>
              <div class="card-footer text-end">
                <button class="btn-lg btn-primary" @click.prevent="update_offre">
                  Mettre à jour le profil
                </button>
              </div>
            </form>
            <!-- Container-fluid Ends-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

