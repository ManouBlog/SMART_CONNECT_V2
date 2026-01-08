<script>
/* eslint-disable */
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "FormView",
  data() {
    return {
      email: null,
      password: null,
      acces: true,
      loading: false,
    };
  },
  methods: {
    go_to_dash() {
      this.acces = false;
      this.loading = true;
      axios
        .post("http://backend.monbrobroli.com/api/auth_login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("reponse", response.data);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            console.log("user", response.data.user);
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 1500);
            localStorage.setItem("token", JSON.stringify(response.data.access_token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            // localStorage.setItem(
            //   "compte",
            //   JSON.stringify(response.data.compte)
            // );
            // localStorage.setItem("statut", response.data.user.statut.statut);
            this.loading = false;
            this.acces = true;
            this.$store.state.user = response.data.user;
            this.$store.state.token = response.data.access_token;
            // this.$store.state.compte = response.data.compte;
            // this.$store.state.statut = response.data.user.statut.statut;
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.loading = false;
            this.acces = true;
          }
        })
        .catch((response) => {
          console.log(response.response.data.message);
          Swal.fire({
            icon: "info",
            title: response.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          this.loading = false;
          this.acces = true;
        });
    },
  },
};
</script>
<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12">
        <div class="login-card">
          <form @submit.prevent="go_to_dash" class="theme-form login-form">
            <img class="w-25 for-light" src="../assets/brobroli_1.png" alt="broboli.png" />
            <h4>Se Connecter</h4>
            <div class="form-group text-start">
              <label>Email Address</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input
                  class="form-control"
                  type="email"
                  required
                  placeholder="adjobi@gmail.com"
                  v-model="email"
                />
              </div>
            </div>
            <div class="form-group text-start">
              <label>Password</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input
                  class="form-control"
                  type="password"
                  name="login[password]"
                  required
                  placeholder="*********"
                  v-model="password"
                />
                <div class="show-hide"><span class="show"> </span></div>
              </div>
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" type="submit">
                <span v-show="loading" class="spinner-border" role="status"></span>
                <span v-show="acces"
                  >Se connecter<em class="bi bi-box-arrow-in-right ms-2"></em
                ></span>
              </button>
            </div>
            <div class="mb-1">
              <!-- <a class="link" href="#">Mot de pass oublié?</a> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("../assets/css/formView.css");
</style>
