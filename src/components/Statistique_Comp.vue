<script>
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
        .post("http://127.0.0.1:8000/api/passwordModify", info, {
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
        .post("http://127.0.0.1:8000/api/passwordModify", Entreprise, {
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
        .post("http://127.0.0.1:8000/api/passwordModify", admin, {
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
        .put("http://127.0.0.1:8000/api/modifier_profil", compte_entreprise, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
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
        .post("http://127.0.0.1:8000/api/modifier_profil", data, {
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
          "http://127.0.0.1:8000/api/modifier_profil",
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
  <div style="border: 2px solid black">
    <h1>Statistiques</h1>
  </div>
</template>
