<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import ForgotPassword from "./ForgotPassword.vue";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "LoginView",
  components: {
    ForgotPassword,
  },
  data() {
    return {
      isModalForgotPassword: false,
      formState: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useRegisterStore, {
      toogleModal: "changeValueIsModal",
    }),
    toogleForgotPassword() {
      this.isModalForgotPassword = !this.isModalForgotPassword;
      console.log(this.isModalForgotPassword);
    },
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    onFinish(values) {
      console.log("Success:", values);
      this.connexionUser(values);
    },
    connexionUser(dataValue) {
      this.launchLoading(true);
      instance
        .post("auth_login", dataValue)
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
            this.toogleModal();
            this.$router.push({
              path: "/",
              query: { redirect: this.path },
            });
            this.launchLoading(false);
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: true,
            });
            this.launchLoading(false);
          }
        })
        .catch((response) => {
          Swal.fire({
            icon: "info",
            title: response.message,
            showConfirmButton: true,
          });
          this.launchLoading(false);
          console.log(response.message);
        });
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="isModalForgotPassword"
    @cancel="isModalForgotPassword"
    @ok="toogleForgotPassword"
  >
    <h2 class="text-center fw-bold" style="color: orange">
      Réinitialiser votre mot de passe
    </h2>
    <h6 class="text-center fw-bold">
      Entrez votre adresse email et nous vous enverrons <br />
      un lien de réinitialisation de mot de passe
    </h6>
    <ForgotPassword />
  </a-modal>
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Mot de passe"
      name="password"
      :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item>
      <div class="text-right">
        <a
          class="login-form-forgot text-danger"
          href="#"
          @click.prevent="toogleForgotPassword"
          >Mot de passe oublié</a
        >
      </div>
    </a-form-item>
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          Se connecter</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
